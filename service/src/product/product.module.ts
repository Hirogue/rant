import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product, ProductCategory } from "../database";
import { ProductCategoryController } from "./product-category.controller";
import { ProductCategoryResolver } from "./product-category.resolver";
import { ProductCategoryService } from "./product-catrgory.service";
import { ProductController } from "./product.controller";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
    controllers: [ProductCategoryController, ProductController],
    providers: [ProductCategoryService, ProductService, ProductCategoryResolver, ProductResolver]
})
export class ProductModule { }