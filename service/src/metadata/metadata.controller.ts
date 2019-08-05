import { ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { Metadata } from "../database";
import { MetadataService } from "./metadata.service";
import { Controller } from "@nestjs/common";

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
@Controller('/api/metadata')
export class MetadataController extends BaseTreeController<Metadata> {
    constructor(public service: MetadataService) {
        super(service)
    }
}