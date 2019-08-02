import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider, ProviderCategory } from "../database";
import { ProviderCategoryController } from "./provider-category.controller";
import { ProviderCategoryResolver } from "./provider-category.resolver";
import { ProviderCategoryService } from "./provider-category.service";
import { ProviderController } from "./provider.controller";
import { ProviderResolver } from "./provider.resolver";
import { ProviderService } from "./provider.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProviderCategory, Provider])],
    controllers: [ProviderCategoryController, ProviderController],
    providers: [ProviderCategoryService, ProviderService, ProviderCategoryResolver, ProviderResolver]
})
export class ProviderModule { }