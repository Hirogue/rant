import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { Area } from "../database";
import { AreaService } from "./area.service";

@Crud({
    model: {
        type: Area,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('area')
@ApiBearerAuth()
@Controller('/api/area')
@UseGuards(AuthGuard('jwt'))
export class AreaController extends BaseTreeController<Area> {
    constructor(public service: AreaService) {
        super(service)
    }
}