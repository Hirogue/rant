import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { ApplyCapital } from "../database";
import { ApplyCapitalService } from "./apply-capital.service";

@ApiUseTags('apply-capital')
@Controller('/api/apply-capital')
export class ApplyCapitalController extends BaseController(ApplyCapital, {
    query: {
        join: {
            applicant: { eager: true },
            capital: { eager: true },
            'capital.creator': { eager: true }
        }
    }
}) {
    constructor(public service: ApplyCapitalService) {
        super(service)
    }
}