import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
@ObjectType()
@InputType('SeoInput')
export class Seo extends Base {
  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  path: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  keywords: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  description: string;

  @Field(type => Int, { nullable: true })
  @Column({ default: 0 })
  @ApiModelProperty({ nullable: true })
  sort: number;
}
