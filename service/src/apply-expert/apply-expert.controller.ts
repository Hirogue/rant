import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { ApplyExpert } from "../database";
import { ApplyExpertService } from "./apply-expert.service";

@ApiUseTags('apply-expert')
@Controller('/api/apply-expert')
export class ApplyExpertController extends BaseController(ApplyExpert, {
    query: {
        join: {
            applicant: { eager: true },
            expert: { eager: true },
            org: { eager: true },
            own: { eager: true },
        }
    }
}) {
    constructor(public service: ApplyExpertService) {
        super(service)
    }
}