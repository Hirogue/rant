import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { Product } from "../database";
import { ProductService } from "./product.service";

@Crud({
    model: {
        type: Product
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        limit: 10,
        maxLimit: 100,
        cache: 10 * 1000,
        sort: [
            {
                field: 'create_at',
                order: 'DESC',
            },
        ],
        join: {
            category: {},
        }
    }
})
@ApiUseTags('product')
@Controller('/api/product')
export class ProductController extends BaseController<Product> {
    constructor(public service: ProductService) {
        super(service)
    }
}