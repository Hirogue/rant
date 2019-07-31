import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { User } from "../database";
import { UserService } from "./user.service";

@Crud({
    model: {
        type: User,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        limit: 10,
        maxLimit: 100,
        cache: 10 * 1000,
        sort: [
            {
                field: 'create_at',
                order: 'DESC',
            },
        ],
        join: {
            org: { eager: true }
        }
    }
})
@ApiUseTags('user')
@ApiBearerAuth()
@Controller('/api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController extends BaseController<User> {
    constructor(public service: UserService) {
        super(service)
    }
}