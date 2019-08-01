import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleCategory } from "../database";
import { ArticleCategoryController } from "./article-category.controller";
import { ArticleCategoryResolver } from "./article-category.resolver";
import { ArticleCategoryService } from "./article-category.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleCategory])],
    controllers: [ArticleCategoryController],
    providers: [ArticleCategoryService, ArticleCategoryResolver]
})
export class ArticleModule { }