import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { IdentityEnum, ProjectStatusEnum, UserStatusEnum } from '../../core';
import { Provider, User } from "../../database";
import { Logger } from "../../logger";

export class LevelUpSetUpStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(User) userRepos?: Repository<User>,
        @TransactionRepository(Provider) providerRepos?: Repository<Provider>
    ): Promise<ExecutionResult> {

        const { data } = context.workflow;

        const user = data.user as User;
        user.status = UserStatusEnum.PENDING;

        await userRepos.save(user);

        if (IdentityEnum.PROVIDER === user.identity) {

            const provider = data.provider as Provider;
            provider.status = ProjectStatusEnum.PENDING;
            provider.creator = user;

            if (provider) {
                await providerRepos.save(provider);
            }

        }

        Logger.log("Level up step:", user.id);

        return await ExecutionResult.next();
    }
}