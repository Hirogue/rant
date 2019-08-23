import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Document } from "./document.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('DocumentCategoryInput')
export class DocumentCategory extends Base {
    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => DocumentCategory, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: DocumentCategory;

    @Field(type => [DocumentCategory]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: DocumentCategory[];

    @Field(type => [Document], { nullable: true })
    @OneToMany(type => Document, target => target.category)
    @ApiModelProperty({ nullable: true })
    docs: Document[];
}