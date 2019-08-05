import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { Metadata } from "../database";
import { BaseTreeController } from "../core";
import { MetadataService } from "./metadata.service";

@Crud({
    model: {
        type: Metadata,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('metadata')
@UseGuards(AuthGuard('jwt'))
export class MetadataController extends BaseTreeController<Metadata> {
    constructor(public service: MetadataService) {
        super(service)
    }
}