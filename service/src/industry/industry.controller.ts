import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { Industry } from "../database";
import { IndustryService } from "./industry.service";

@Crud({
    model: {
        type: Industry,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('industry')
@ApiBearerAuth()
@Controller('/api/industry')
@UseGuards(AuthGuard('jwt'))
export class IndustryController extends BaseTreeController<Industry> {
    constructor(public service: IndustryService) {
        super(service)
    }
}