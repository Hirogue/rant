import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { ArticleCategory } from "../database";
import { ArticleCategoryService } from "./article-category.service";

@Crud({
    model: {
        type: ArticleCategory,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('article')
@Controller('/api/article/category')
export class ArticleCategoryController extends BaseTreeController<ArticleCategory> {
    constructor(public service: ArticleCategoryService) {
        super(service)
    }
}