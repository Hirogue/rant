import { ExecutionResult, WorkflowBase, WorkflowBuilder } from "workflow-es";
import { FillInDataStep } from "./steps/fill-in-data.step";

export class UserFlow implements WorkflowBase<any> {
    public id: string = "user-flow";
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {
        builder
            .startWith(FillInDataStep)
            // .waitFor('UserApproval', data => )
            .thenRun((context) => {
                console.log("Goodbye world");
                return ExecutionResult.next();
            });
    }
}