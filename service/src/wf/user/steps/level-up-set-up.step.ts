import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { Logger } from "../../../logger";

export class LevelUpSetUpStep extends StepBody {

    public run(context: StepExecutionContext): Promise<ExecutionResult> {

        Logger.log("Level up step:", context.workflow);

        return ExecutionResult.next();
    }
}