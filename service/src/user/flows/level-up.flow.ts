import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { FlowIdEnum } from "../../wf";
import { UserEventEnum } from "../enums";
import { AdminApprovalStep, CheckStatusStep, LevelUpSetUpStep } from "../steps";

export class LevelUpFlow implements WorkflowBase<any> {
    public id: string = FlowIdEnum.LEVEL_UP;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {

        builder
            .startWith(CheckStatusStep)
            .then(LevelUpSetUpStep)
            .waitFor(UserEventEnum.ADMIN_APPROVAL, data => {
                Logger.log(`Waiting for event ${UserEventEnum.ADMIN_APPROVAL}-${data.user.id}:`, data);
                return `${UserEventEnum.ADMIN_APPROVAL}-${data.user.id}`;
            })
            .output((step, data) => data.eventData = step.eventData)
            .then(AdminApprovalStep)

    }
}