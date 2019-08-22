import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { Logger } from "../../logger";

export class CheckStatusStep extends StepBody {

    public run(context: StepExecutionContext): Promise<ExecutionResult> {

        Logger.log('Check status step', context.workflow);
        return ExecutionResult.next();
    }

}