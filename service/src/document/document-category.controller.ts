import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseTreeController } from "../core";
import { DocumentCategory } from "../database";
import { DocumentCategoryService } from "./document-category.service";


@ApiUseTags('document')
@Controller('/api/document/category')
export class DocumentCategoryController extends BaseTreeController(DocumentCategory) {
    constructor(public service: DocumentCategoryService) {
        super(service)
    }
}