import { Repository, Transaction, TransactionRepository } from "typeorm";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { ProjectStatusEnum } from "../../core";
import { Capital } from "../../database";
import { Logger } from "../../logger";

export class CapitalSetUpStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(Capital) capitalRepos?: Repository<Capital>,
    ): Promise<ExecutionResult> {
        const { data } = context.workflow;

        const capital = data as Capital;
        capital.status = ProjectStatusEnum.PENDING;

        const result = await capitalRepos.save(data);

        Logger.log('Capital set up', result);

        return await ExecutionResult.next();
    }

}