import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, ArticleCategory } from '../database';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategoryResolver } from './article-category.resolver';
import { ArticleCategoryService } from './article-category.service';
import { ArticleController } from './article.controller';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory, Article])],
  controllers: [ArticleCategoryController, ArticleController],
  providers: [
    ArticleCategoryService,
    ArticleService,
    ArticleCategoryResolver,
    ArticleResolver,
  ],
})
export class ArticleModule {}
