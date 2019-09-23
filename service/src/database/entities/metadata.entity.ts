import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Base } from './base';
import { User } from './user.entity';

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('MetadataInput')
export class Metadata extends Base {
  @Field({ nullable: true })
  @Column()
  @ApiModelProperty({ nullable: true })
  title: string;

  @Field(type => Int, { nullable: true })
  @Column({ default: 0 })
  @ApiModelProperty({ nullable: true })
  sort: number;

  @Field(type => Metadata, { nullable: true })
  @TreeParent()
  @ApiModelProperty({ nullable: true })
  parent: Metadata;

  @Field(type => [Metadata]!, { nullable: true })
  @TreeChildren()
  @ApiModelProperty({ nullable: true })
  children: Metadata[];
}
