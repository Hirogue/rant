import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { ArticleCategory } from "./article-category.entity";
import { Base } from "./base";

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
    @Column({ nullable: true })
    source: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    cover: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    is_top: boolean;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    is_published: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'text', default: '' })
    text: string;

    @Field({ nullable: true })
    @Column({ type: 'datetime', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    publish_at: string;

    @Field(type => ArticleCategory, { nullable: true })
    @ManyToOne(type => ArticleCategory, target => target.articles)
    category: ArticleCategory;

}