import { Module } from "@nestjs/common";
import { CacheModule } from "../cache";
import { WechatController } from "./wechat.controller";
import { WechatService } from "./wechat.service";

@Module({
    imports: [CacheModule],
    controllers: [WechatController],
    providers: [WechatService],
    exports: [WechatService]
})
export class WechatModule { }