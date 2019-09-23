import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base';

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('ArticleCategoryInput')
export class ArticleCategory extends Base {
  @Field({ nullable: true })
  @Column()
  @ApiModelProperty({ nullable: true })
  title: string;

  @Field(type => Int, { nullable: true })
  @Column({ default: 0 })
  @ApiModelProperty({ nullable: true })
  sort: number;

  @Field(type => ArticleCategory, { nullable: true })
  @TreeParent()
  @ApiModelProperty({ nullable: true })
  parent: ArticleCategory;

  @Field(type => [ArticleCategory]!, { nullable: true })
  @TreeChildren()
  @ApiModelProperty({ nullable: true })
  children: ArticleCategory[];

  @Field(type => [Article], { nullable: true })
  @OneToMany(type => Article, target => target.category)
  @ApiModelProperty({ nullable: true })
  articles: Article[];
}
