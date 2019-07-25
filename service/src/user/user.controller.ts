import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiUseTags, ApiBearerAuth } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { User } from "../database";
import { UserService } from "./user.service";

@Crud({
    model: {
        type: User,
    }
})
@ApiUseTags('user')
@ApiBearerAuth()
@Controller('/api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(public service: UserService) { }
}