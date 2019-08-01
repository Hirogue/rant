import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { Article } from "../database";
import { ArticleService } from "./article.service";

@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        limit: 10,
        maxLimit: 100,
        cache: 10 * 1000,
        sort: [
            {
                field: 'create_at',
                order: 'DESC',
            },
        ],
        join: {
            org: {}
        }
    }
})
@ApiUseTags('article')
@ApiBearerAuth()
@Controller('/api/article')
@UseGuards(AuthGuard('jwt'))
export class ArticleController extends BaseController<Article> {
    constructor(public service: ArticleService) {
        super(service)
    }
}