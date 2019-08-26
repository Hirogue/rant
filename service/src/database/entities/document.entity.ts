import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { DocumentCategory } from "./document-category.entity";

@Entity()
@ObjectType()
@InputType('DocumentInput')
export class Document extends Base {

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
    @Column({ type: 'timestamp', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true })
    publish_at: string;

    @Field(type => DocumentCategory, { nullable: true })
    @ManyToOne(type => DocumentCategory, target => target.docs)
    @ApiModelProperty({ nullable: true })
    category: DocumentCategory;

}