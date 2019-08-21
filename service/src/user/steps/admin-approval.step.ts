import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";
import { Logger } from "../../logger";

export class AdminApprovalStep extends StepBody {

    public run(context: StepExecutionContext): Promise<ExecutionResult> {

        Logger.log("Admin approval step:", context.workflow);
        return ExecutionResult.next();
    }
}