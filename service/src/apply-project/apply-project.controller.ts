import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { ApplyProject } from "../database";
import { ApplyProjectService } from "./apply-project.service";

@ApiUseTags('apply-project')
@Controller('/api/apply-project')
export class ApplyProjectController extends BaseController(ApplyProject, {
    query: {
        join: {
            applicant: { eager: true },
            project: { eager: true },
            'project.creator': { eager: true }
        }
    }
}) {
    constructor(public service: ApplyProjectService) {
        super(service)
    }
}