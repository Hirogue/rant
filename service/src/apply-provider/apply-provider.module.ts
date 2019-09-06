import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyProvider } from "../database";
import { ApplyProviderController } from "./apply-provider.controller";
import { ApplyProviderResolver } from "./apply-provider.resolver";
import { ApplyProviderService } from "./apply-provider.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApplyProvider])],
    controllers: [ApplyProviderController],
    providers: [
        ApplyProviderService,
        ApplyProviderResolver
    ]
})
export class ApplyProviderModule { }