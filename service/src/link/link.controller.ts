import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Link } from "../database";
import { LinkService } from "./link.service";

@ApiUseTags('link')
@Controller('/api/link')
export class LinkController extends BaseController(Link) {
    constructor(public service: LinkService) {
        super(service)
    }
}