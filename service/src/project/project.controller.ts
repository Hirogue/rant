import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Project } from "../database";
import { ProjectService } from "./project.service";

@ApiUseTags('project')
@Controller('/api/project')
export class ProjectController extends BaseController(Project, {
    query: {
        join: {
            creator: { eager: true },
            org: { eager: true },
            own: { eager: true },
            applicants: {},
            industry: { eager: true },
            area: { eager: true },
            stage: { eager: true },
            exit_mode: { eager: true },
            withdrawal_year: { eager: true },
            ratio: { eager: true },
            data: { eager: true },
            risk: { eager: true },
            interest: { eager: true },
            occupancy_time: { eager: true },
        }
    }
}) {
    constructor(public service: ProjectService) {
        super(service)
    }
}