import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { EventEnum } from "../enums";
import { ApprovalStep, CheckStatusStep, SetUpStep } from "../steps";

export const FlowId = 'publish-capital';

export class PublishCapitalFlow implements WorkflowBase<any> {
    public id: string = FlowId;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {

        builder
            .startWith(CheckStatusStep)
            .then(SetUpStep)
            .waitFor(EventEnum.APPROVAL, data => {
                Logger.log(`Waiting for event ${EventEnum.APPROVAL}-${data.user.id}:`, data);
                return `${EventEnum.APPROVAL}-${data.user.id}`;
            })
            .output((step, data) => data.eventData = step.eventData)
            .then(ApprovalStep)

    }
}