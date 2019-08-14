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
            creator: {},
            applicants: {},
            industry: {},
            area: {},
            stage: {},
            exit_mode: {},
            withdrawal_year: {},
            ratio: {},
            data: {},
            risk: {},
            interest: {},
            occupancy_time: {},
        }
    }
}) {
    constructor(public service: ProjectService) {
        super(service)
    }
}