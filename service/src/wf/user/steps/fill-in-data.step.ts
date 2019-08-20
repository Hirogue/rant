import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";

export class FillInDataStep extends StepBody {
    public run(context: StepExecutionContext): Promise<ExecutionResult> {
        console.log("Hello World");
        return ExecutionResult.next();
    }
}