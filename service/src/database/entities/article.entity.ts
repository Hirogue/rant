import { Base } from "./base";
import { Column, Entity, ManyToOne } from "typeorm";
import { ArticleCategory } from "./article-category.entity";
import { Field, InputType, ObjectType, Int } from "type-graphql";

@Entity()
@ObjectType()
@InputType('ArticleInput')
export class Article extends Base {

    @Field({ nullable: true })
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column()
    author: string;

    @Field({ nullable: true })
    @Column()
    source: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    cover: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    istop: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field({ nullable: true })
    @Column()
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'text' })
    text: string;

    @Field(type => ArticleCategory, { nullable: true })
    @ManyToOne(type => ArticleCategory, target => target.articles)
    category: ArticleCategory;
}