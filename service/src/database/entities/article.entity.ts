import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ArticleCategory } from './article-category.entity';
import { Base } from './base';

@Entity()
@ObjectType()
@InputType('ArticleInput')
export class Article extends Base {
  @Field({ nullable: true })
  @Column()
  @ApiModelProperty({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column()
  @ApiModelProperty({ nullable: true })
  author: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  source: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  cover: string;

  @Field(type => Int, { nullable: true })
  @Column({ default: 0 })
  @ApiModelProperty({ nullable: true })
  views: number;

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: false })
  @ApiModelProperty({ nullable: true })
  is_top: boolean;

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: false })
  @ApiModelProperty({ nullable: true })
  is_published: boolean;

  @Field(type => Int, { nullable: true })
  @Column({ default: 0 })
  @ApiModelProperty({ nullable: true })
  sort: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  summary: string;

  @Field({ nullable: true })
  @Column({ type: 'text', default: '' })
  @ApiModelProperty({ nullable: true })
  text: string;

  @Field({ nullable: true })
  @Column({
    type: 'timestamp',
    nullable: true,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  @ApiModelProperty({ nullable: true })
  publish_at: string;

  @Field(type => ArticleCategory, { nullable: true })
  @ManyToOne(type => ArticleCategory, target => target.articles)
  @ApiModelProperty({ nullable: true })
  category: ArticleCategory;
}
