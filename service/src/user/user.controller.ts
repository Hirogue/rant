import { Body, Controller, forwardRef, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { BaseController, SmsTypeEnum } from "../core";
import { User } from "../database";
import { VerificationService } from "../verification";
import { RegisterDto, ResetPasswordDto } from "./dtos";
import { UserService } from "./user.service";

@ApiUseTags('user')
@Controller('/api/user')
export class UserController extends BaseController(User, {
    query: {
        join: {
            org: {},
            area: {},
            apply_products: {},
            apply_projects: {},
            apply_capitals: {},
            apply_providers: {},
            'apply_providers.applicant': {},
            'apply_providers.provider': {},
        }
    }
}) {
    constructor(
        public readonly service: UserService,
        @Inject(forwardRef(() => VerificationService))
        private readonly verificationService: VerificationService
    ) {
        super(service)
    }

    @Post('register')
    @ApiOperation({ title: 'Register a new user' })
    async register(@Body() dto: RegisterDto) {

        await this.verificationService.verifySms(dto.phone, dto.smsCode, SmsTypeEnum.REGISTER);

        return await this.service.register(dto);
    }

    @Post('reset-password')
    @ApiOperation({ title: 'Reset password' })
    async fotgot(@Body() dto: ResetPasswordDto) {

        await this.verificationService.verifySms(dto.phone, dto.smsCode, SmsTypeEnum.PASSWORD);

        return await this.service.resetPassword(dto);
    }
}