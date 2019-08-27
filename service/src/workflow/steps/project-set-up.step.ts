import { Repository, Transaction, TransactionRepository } from "typeorm";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { ProjectStatusEnum } from "../../core";
import { Project } from "../../database";
import { Logger } from "../../logger";

export class ProjectSetUpStep extends StepBody {

    @Transaction()
    public async run(
        context: StepExecutionContext,
        @TransactionRepository(Project) projectRepos?: Repository<Project>,
    ): Promise<ExecutionResult> {
        const { data } = context.workflow;

        const project = data as Project;
        project.status = ProjectStatusEnum.PENDING;

        const result = await projectRepos.save(data);

        Logger.log('Project set up', result);

        return await ExecutionResult.next();
    }

}