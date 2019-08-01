import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent, OneToMany } from "typeorm";
import { Base } from "./base";
import { Article } from "./article.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('ArticleCategoryInput')
export class ArticleCategory extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => ArticleCategory, { nullable: true })
    @TreeParent()
    parent: ArticleCategory;

    @Field(type => [ArticleCategory]!, { nullable: true })
    @TreeChildren()
    children: ArticleCategory[];

    @Field(type => [Article], { nullable: true })
    @OneToMany(type => Article, target => target.category)
    articles: Article[];
}