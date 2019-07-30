import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { Org } from "../database";
import { OrgService } from "./org.service";

@Crud({
    model: {
        type: Org,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})
@ApiUseTags('org')
@ApiBearerAuth()
@Controller('/api/org')
@UseGuards(AuthGuard('jwt'))
export class OrgController extends BaseTreeController<Org> {
    constructor(public service: OrgService) {
        super(service)
    }
}