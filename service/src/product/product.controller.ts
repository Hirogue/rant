import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Product } from "../database";
import { ProductService } from "./product.service";
import { ApiUseTags } from "@nestjs/swagger";

@Crud({
    model: {
        type: Product,
    },
    query: {
        join: {
            category: {
                allow: ['name']
            }
        }
    }
})
@ApiUseTags('product')
@Controller('api/product')
export class ProductController {
    constructor(
        public service: ProductService
    ) { }
}