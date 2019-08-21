import { getConnection } from 'typeorm';
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { User } from "../../database";
import { Logger } from "../../logger";

export class LevelUpSetUpStep extends StepBody {

    public async run(context: StepExecutionContext): Promise<ExecutionResult> {

        const connection = getConnection();
        const userRepos = connection.getRepository(User);

        Logger.log("Level up step:", context.workflow);

        return await ExecutionResult.next();
    }
}