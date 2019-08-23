import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Expert } from "../database";
import { ExpertService } from "./expert.service";

@ApiUseTags('expert')
@Controller('/api/expert')
export class ExpertController extends BaseController(Expert) {
    constructor(public service: ExpertService) {
        super(service)
    }
}