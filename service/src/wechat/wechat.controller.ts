import { Controller, Get, Req } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { WechatService } from "./wechat.service";

@ApiUseTags('wechat')
@Controller('/api/wechat')
export class WechatController {

    constructor(private readonly service: WechatService) { }

    @Get('signature')
    async signature(@Req() req) {
        return await this.service.signature(req.url);
    }
}