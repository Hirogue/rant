import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Log } from "../database";
import { LogService } from "./log.service";

@ApiUseTags('log')
@Controller('/api/log')
export class LogController extends BaseController(Log) {
    constructor(public service: LogService) {
        super(service)
    }
}