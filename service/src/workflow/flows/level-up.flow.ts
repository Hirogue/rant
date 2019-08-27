import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { FlowEventEnum } from "../flow-event.enum";
import { FlowIdEnum } from "../flow-id.enum";
import { ApprovalUserStep, CheckStatusStep, LevelUpSetUpStep } from "../steps";

export class LevelUpFlow implements WorkflowBase<any> {
    public id: string = FlowIdEnum.LEVEL_UP;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {

        builder
            .startWith(CheckStatusStep)
            .then(LevelUpSetUpStep)
            .waitFor(FlowEventEnum.APPROVAL_USER, data => {
                Logger.log(`Waiting for event ${FlowEventEnum.APPROVAL_USER}-${data.user.id}:`, data);
                return `${FlowEventEnum.APPROVAL_USER}-${data.user.id}`;
            })
            .output((step, data) => data.eventData = step.eventData)
            .then(ApprovalUserStep)

    }
}