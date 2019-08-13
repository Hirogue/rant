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
            area: {}
        }
    }
}) {
    constructor(public service: CapitalService) {
        super(service)
    }
}