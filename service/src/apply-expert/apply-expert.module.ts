import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyExpert } from "../database";
import { ApplyExpertController } from "./apply-expert.controller";
import { ApplyExpertResolver } from "./apply-expert.resolver";
import { ApplyExpertService } from "./apply-expert.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApplyExpert])],
    controllers: [ApplyExpertController],
    providers: [
        ApplyExpertService,
        ApplyExpertResolver
    ]
})
export class ApplyExpertModule { }