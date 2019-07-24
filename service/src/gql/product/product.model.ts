import { Module } from "@nestjs/common";
import { ProductCategory } from "../../database/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "./product.service";
import { ProductCategoryResolver } from "./product-category.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    providers: [ProductService, ProductCategoryResolver]
})
export class ProductModule { }