import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseTreeController } from "../core";
import { ProviderCategory } from "../database";
import { ProviderCategoryService } from "./provider-category.service";

@ApiUseTags('provider')
@Controller('/api/provider/category')
export class ProviderCategoryController extends BaseTreeController(ProviderCategory) {
    constructor(public service: ProviderCategoryService) {
        super(service)
    }
}