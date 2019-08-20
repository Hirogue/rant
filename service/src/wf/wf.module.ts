import { Module } from "@nestjs/common";
import { WfService } from "./wf.service";

@Module({
    providers: [WfService],
    exports: [WfService]
})
export class WfModule { }