import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product, ProductCategory } from "../../database/entities";
import { ProductCategoryResolver } from "./product-category.resolver";
import { ProductCategoryService } from "./product-category.service";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
    providers: [
        ProductService,
        ProductCategoryService,
        ProductResolver,
        ProductCategoryResolver
    ]
})
export class ProductModule { }