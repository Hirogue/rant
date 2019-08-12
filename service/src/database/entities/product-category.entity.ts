import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Product } from "./product.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('ProductCategoryInput')
export class ProductCategory extends Base {
    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => ProductCategory, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: ProductCategory;

    @Field(type => [ProductCategory]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: ProductCategory[];

    @Field(type => [Product], { nullable: true })
    @OneToMany(type => Product, target => target.category)
    @ApiModelProperty({ nullable: true })
    products: Product[];
}