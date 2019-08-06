import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { Project } from "../database";
import { ProjectService } from "./project.service";

@ApiUseTags('project')
@Controller('/api/project')
export class ProjectController extends BaseController(Project, {
    query: {
        join: {
            creator: {},
        }
    }
}) {
    constructor(public service: ProjectService) {
        super(service)
    }
}