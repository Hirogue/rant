import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Authority } from "../database";
import { AuthorityService } from "./authority.service";

@ApiUseTags('authority')
@Controller('/api/authority')
export class AuthorityController extends BaseController(Authority) {
    constructor(public service: AuthorityService) {
        super(service)
    }
}