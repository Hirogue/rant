import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product, ProductCategory } from "../database/entities";
import { ProductCategoryResolver } from "./product-category.resolver";
import { ProductCategoryService } from "./product-category.service";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
    controllers: [ProductController],
    providers: [
        ProductService,
        ProductCategoryService,
        ProductResolver,
        ProductCategoryResolver
    ],
    exports: [ProductService]
})
export class ProductModule { }