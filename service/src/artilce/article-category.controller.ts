import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
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
@ApiBearerAuth()
@Controller('/api/article/category')
@UseGuards(AuthGuard('jwt'))
export class ArticleCategoryController extends BaseTreeController<ArticleCategory> {
    constructor(public service: ArticleCategoryService) {
        super(service)
    }
}