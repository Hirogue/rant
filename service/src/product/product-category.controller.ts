import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { ProductCategory } from "../database";
import { ProductCategoryService } from "./product-catrgory.service";

@Crud({
    model: {
        type: ProductCategory,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('product')
@Controller('/api/product/category')
export class ProductCategoryController extends BaseTreeController<ProductCategory> {
    constructor(public service: ProductCategoryService) {
        super(service)
    }
}