import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseTreeController } from "../core";
import { ProductCategory } from "../database";
import { ProductCategoryService } from "./product-catrgory.service";

@ApiUseTags('product')
@Controller('/api/product/category')
export class ProductCategoryController extends BaseTreeController(ProductCategory) {
    constructor(public service: ProductCategoryService) {
        super(service)
    }
}