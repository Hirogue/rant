import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { CapitalType } from "../database";
import { CapitalTypeService } from "./capital-type.service";

@Crud({
    model: {
        type: CapitalType,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('capital-type')
@ApiBearerAuth()
@Controller('/api/capital-type')
@UseGuards(AuthGuard('jwt'))
export class CapitalTypeController extends BaseTreeController<CapitalType> {
    constructor(public service: CapitalTypeService) {
        super(service)
    }
}