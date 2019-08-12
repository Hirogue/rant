import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { SendSmsDto } from "./dtos/send-sms.dto";
import { VerificationService } from "./verification.service";


@ApiUseTags('verification')
@Controller('api/verification')
export class VerificationController {

    constructor(
        private readonly verificationService: VerificationService,
    ) { }

    @Get('svg')
    async svg() {
        return await this.verificationService.generateSvg();
    }

    @Post('sms')
    async sms(@Body() dto: SendSmsDto) {

        await this.verificationService.verifySvg(dto.svgKey, dto.svgCode);

        return await this.verificationService.sendSms(dto.phone, dto.smsType);
    }
}