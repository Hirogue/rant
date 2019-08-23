import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Document } from "../database";
import { DocumentService } from "./document.service";


@ApiUseTags('document')
@Controller('/api/document')
export class DocumentController extends BaseController(Document, {
    query: {
        join: {
            category: {}
        }
    }
}) {
    constructor(public service: DocumentService) {
        super(service)
    }
}