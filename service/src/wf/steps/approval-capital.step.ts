import { Repository, Transaction, TransactionRepository } from "typeorm";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { Capital } from "../../database";
import { Logger } from "../../logger";

export class ApprovalCapitalStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(Capital) capitalRepos?: Repository<Capital>,
    ): Promise<ExecutionResult> {

        const { data } = context.workflow;
        const eventData = data.eventData;

        const result = await capitalRepos.save(eventData);

        Logger.log('Approval capital step', result);
        return await ExecutionResult.next();
    }

}