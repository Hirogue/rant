import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "../database";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService]
})
export class ArticleModule { }