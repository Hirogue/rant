import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { Project } from "../database";
import { ProjectService } from "./project.service";

@Crud({
    model: {
        type: Project
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        limit: 10,
        maxLimit: 100,
        cache: 10 * 1000,
        sort: [
            {
                field: 'create_at',
                order: 'DESC',
            },
        ],
        join: {
            creator: {}
        }
    }
})
@ApiUseTags('project')
@Controller('/api/project')
export class ProjectController extends BaseController<Project> {
    constructor(public service: ProjectService) {
        super(service)
    }
}