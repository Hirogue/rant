import { Body, Controller, forwardRef, Inject, Post } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";
import { BaseController, SmsTypeEnum } from "../core";
import { User } from "../database";
import { VerificationService } from "../verification";
import { RegisterDto } from "./dtos/register.dto";
import { UserService } from "./user.service";

@ApiUseTags('user')
@Controller('/api/user')
export class UserController extends BaseController(User, {
    query: {
        join: {
            org: {},
            apply_products: {},
            apply_projects: {},
            apply_capitals: {},
            apply_providers: {},
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
}