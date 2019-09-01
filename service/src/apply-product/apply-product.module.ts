import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyProduct } from "../database";
import { ApplyProductController } from "./apply-product.controller";
import { ApplyProductResolver } from "./apply-product.resolver";
import { ApplyProductService } from "./apply-product.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApplyProduct])],
    controllers: [ApplyProductController],
    providers: [
        ApplyProductService,
        ApplyProductResolver
    ]
})
export class ApplyProductModule { }