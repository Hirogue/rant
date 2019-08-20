import { ExecutionResult, WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Logger } from "../../logger";
import { FlowIdEnum } from "../flow-id.enum";
import { UserEventEnum } from "./user-event.enum";
import { LevelUpSetUpStep } from "./steps/level-up-set-up.step";
import { AdminApprovalStep } from "./steps/admin-approval.step";

export class LevelUpFlow implements WorkflowBase<any> {
    public id: string = FlowIdEnum.LEVEL_UP;
    public version: number = 1;

    public build(builder: WorkflowBuilder<any>) {
        builder
            .startWith(LevelUpSetUpStep)
            .waitFor(UserEventEnum.ADMIN_APPROVAL, data => {
                Logger.log(`Waiting for event ${UserEventEnum.ADMIN_APPROVAL}-${data.user.id}:`, data);
                return `${UserEventEnum.ADMIN_APPROVAL}-${data.user.id}`;
            })
            .then(AdminApprovalStep);
    }
}