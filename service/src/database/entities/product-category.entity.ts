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
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => ProductCategory, { nullable: true })
    @TreeParent()
    parent: ProductCategory;

    @Field(type => [ProductCategory]!, { nullable: true })
    @TreeChildren()
    children: ProductCategory[];

    @Field(type => [Product], { nullable: true })
    @OneToMany(type => Product, target => target.category)
    products: Product[];
}