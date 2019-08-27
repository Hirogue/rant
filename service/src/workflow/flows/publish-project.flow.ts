import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { FlowEventEnum } from "../flow-event.enum";
import { FlowIdEnum } from "../flow-id.enum";
import { CheckStatusStep, ProjectSetUpStep } from "../steps";
import { ApprovalProjectStep } from "../steps/approval-project.step";

export class PublishProjectFlow implements WorkflowBase<any> {
    public id: string = FlowIdEnum.PUBLISH_PROJECT;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {

        builder
            .startWith(CheckStatusStep)
            .then(ProjectSetUpStep)
            .waitFor(FlowEventEnum.APPROVAL_PROJECT, data => {
                Logger.log(`Waiting for event ${FlowEventEnum.APPROVAL_PROJECT}-${data.id}:`);
                return `${FlowEventEnum.APPROVAL_PROJECT}-${data.id}`;
            })
            .output((step, data) => data.eventData = step.eventData)
            .then(ApprovalProjectStep);

    }
}