import { Body, Controller, Get, Post, CacheKey } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";
import { SendSmsDto } from "./dtos/send-sms.dto";
import { VerificationService } from "./verification.service";


@ApiUseTags('verification')
@Controller('api/verification')
export class VerificationController {

    constructor(
        private readonly verificationService: VerificationService,
    ) { }

    @Get('svg')
    @ApiOperation({ title: 'Get svg verification code' })
    async svg() {
        return await this.verificationService.generateSvg();
    }

    @Post('sms')
    @ApiOperation({ title: 'Send SMS verification code' })
    async sms(@Body() dto: SendSmsDto) {

        await this.verificationService.verifySvg(dto.svgKey, dto.svgCode);

        return await this.verificationService.sendSms(dto.phone, dto.smsType);
    }
}