import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseTreeController } from "../core";
import { ArticleCategory } from "../database";
import { ArticleCategoryService } from "./article-category.service";


@ApiUseTags('article')
@Controller('/api/article/category')
export class ArticleCategoryController extends BaseTreeController(ArticleCategory) {
    constructor(public service: ArticleCategoryService) {
        super(service)
    }
}