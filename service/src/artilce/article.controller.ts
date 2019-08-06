import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Article } from "../database";
import { ArticleService } from "./article.service";


@ApiUseTags('article')
@Controller('/api/article')
export class ArticleController extends BaseController(Article, {
    query: {
        join: {
            category: {}
        }
    }
}) {
    constructor(public service: ArticleService) {
        super(service)
    }
}