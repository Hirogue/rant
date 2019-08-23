import { Repository, Transaction, TransactionRepository } from "typeorm";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { Project } from "../../database";
import { Logger } from "../../logger";

export class ApprovalProjectStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(Project) projectRepos?: Repository<Project>,
    ): Promise<ExecutionResult> {

        const { data } = context.workflow;
        const eventData = data.eventData;

        const result = await projectRepos.save(eventData);

        Logger.log('Approval project step', result);
        return await ExecutionResult.next();
    }

}