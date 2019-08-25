import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Seo } from "../database";
import { SeoService } from "./seo.service";

@ApiUseTags('seo')
@Controller('/api/seo')
export class SeoController extends BaseController(Seo) {
    constructor(public service: SeoService) {
        super(service)
    }
}