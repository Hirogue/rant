import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { FlowEventEnum } from "../flow-event.enum";
import { FlowIdEnum } from "../flow-id.enum";
import { ApprovalCapitalStep, CheckStatusStep, CapitalSetUpStep } from "../steps";

export class PublishCapitalFlow implements WorkflowBase<any> {
    public id: string = FlowIdEnum.PUBLISH_CAPITAL;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {

        builder
            .startWith(CheckStatusStep)
            .then(CapitalSetUpStep)
            .waitFor(FlowEventEnum.APPROVAL_CAPITAL, data => {
                Logger.log(`Waiting for event ${FlowEventEnum.APPROVAL_CAPITAL}-${data.id}:`);
                return `${FlowEventEnum.APPROVAL_CAPITAL}-${data.id}`;
            })
            .output((step, data) => data.eventData = step.eventData)
            .then(ApprovalCapitalStep);

    }
}