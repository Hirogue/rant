import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../database";
import { ProjectController } from "./project.controller";
import { ProjectResolver } from "./project.resolver";
import { ProjectService } from "./project.service";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectController],
    providers: [
        ProjectService,
        ProjectResolver
    ]
})
export class ProjectModule { }