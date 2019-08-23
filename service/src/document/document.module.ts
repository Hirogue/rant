import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document, DocumentCategory } from "../database";
import { DocumentCategoryController } from "./document-category.controller";
import { DocumentCategoryResolver } from "./document-category.resolver";
import { DocumentCategoryService } from "./document-category.service";
import { DocumentController } from "./document.controller";
import { DocumentResolver } from "./document.resolver";
import { DocumentService } from "./document.service";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentCategory, Document])],
    controllers: [DocumentCategoryController, DocumentController],
    providers: [
        DocumentCategoryService,
        DocumentService,
        DocumentCategoryResolver,
        DocumentResolver
    ]
})
export class DocumentModule { }