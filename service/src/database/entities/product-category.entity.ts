import { Entity, Tree, Column, TreeChildren, TreeParent } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
export class ProductCategory extends Base {
    @Field()
    @Column()
    name: string;

    @Field(type => Int)
    @Column({ default: 0 })
    sort: number;

    @Field(type => [ProductCategory]!, { nullable: true })
    @TreeChildren()
    children: ProductCategory[];

    @Field(type => ProductCategory, { nullable: true })
    @TreeParent()
    parent: ProductCategory;
}