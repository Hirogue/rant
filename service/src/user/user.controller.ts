import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { User } from "../database";
import { UserService } from "./user.service";

@ApiUseTags('user')
@Controller('/api/user')
export class UserController extends BaseController(User, {
    query: {
        join: {
            org: {}
        }
    }
}) {
    constructor(public service: UserService) {
        super(service)
    }
}