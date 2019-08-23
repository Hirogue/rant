import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { SuccessCase } from "../database";
import { SuccessCaseService } from "./success-case.service";


@ApiUseTags('success-case')
@Controller('/api/success-case')
export class SuccessCaseController extends BaseController(SuccessCase) {
    constructor(public service: SuccessCaseService) {
        super(service)
    }
}