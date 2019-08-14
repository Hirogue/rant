import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Product } from "../database";
import { ProductService } from "./product.service";

@ApiUseTags('product')
@Controller('/api/product')
export class ProductController extends BaseController(Product, {
    query: {
        join: {
            category: {},
            applicants: {},
        }
    }
}) {
    constructor(public service: ProductService) {
        super(service)
    }
}