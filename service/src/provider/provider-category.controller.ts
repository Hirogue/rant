import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { ProviderCategory } from "../database";
import { ProviderCategoryService } from "./provider-category.service";

@Crud({
    model: {
        type: ProviderCategory,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('provider')
@ApiBearerAuth()
@Controller('/api/provider/category')
@UseGuards(AuthGuard('jwt'))
export class ProviderCategoryController extends BaseTreeController<ProviderCategory> {
    constructor(public service: ProviderCategoryService) {
        super(service)
    }
}