import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyProject } from "../database";
import { ApplyProjectController } from "./apply-project.controller";
import { ApplyProjectResolver } from "./apply-project.resolver";
import { ApplyProjectService } from "./apply-project.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApplyProject])],
    controllers: [ApplyProjectController],
    providers: [
        ApplyProjectService,
        ApplyProjectResolver
    ]
})
export class ApplyProjectModule { }