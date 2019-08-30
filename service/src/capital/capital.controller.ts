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
            creator: { eager: true },
            org: { eager: true },
            own: { eager: true },
            applicants: {},
            industry: { eager: true },
            type: { eager: true },
            area: { eager: true },
            invest_area: { eager: true },
            risk: { eager: true },
            data: { eager: true },
            equity_type: { eager: true },
            stage: { eager: true },
            invest_type: { eager: true },
            ratio: { eager: true },
        }
    }
}) {
    constructor(public service: CapitalService) {
        super(service)
    }
}