import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Capital } from "../database";
import { CapitalService } from "./capital.service";

@ApiUseTags('capital')
@Controller('/api/capital')
export class CapitalController extends BaseController(Capital, {
    query: {
        join: {
            creator: {},
            applicants: {},
            industry: {},
            type: {},
            area: {},
            invest_area: {},
            risk: {},
            data: {},
            equity_type: {},
            stage: {},
            invest_type: {},
            ratio: {},
        }
    }
}) {
    constructor(public service: CapitalService) {
        super(service)
    }
}