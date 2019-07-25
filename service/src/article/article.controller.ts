import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Article } from '../database';
import { ArticleService } from './article.service';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Article,
    },
})
@ApiUseTags('article')
@Controller('api/article')
export class ArticleController {
    constructor(public service: ArticleService) { }
}
