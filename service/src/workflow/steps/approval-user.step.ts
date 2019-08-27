import { Repository, Transaction, TransactionRepository } from "typeorm";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { UserLevelEnum, UserStatusEnum } from "../../core";
import { User } from "../../database";
import { Logger } from "../../logger";

export class ApprovalUserStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(User) userRepos?: Repository<User>
    ): Promise<ExecutionResult> {

        const { data } = context.workflow;
        const eventData = data.eventData;

        const user = data.user as User;
        user.status = eventData.status;

        if (UserStatusEnum.CHECKED === user.status) {
            user.vip = UserLevelEnum.V1;
        }

        if (UserStatusEnum.REJECTED === user.status) {
            user.vip = UserLevelEnum.V0;
            user.reason = eventData.reason;
        }

        await userRepos.save(user);

        Logger.log("Admin approval step", user.id);

        return await ExecutionResult.next();
    }
}