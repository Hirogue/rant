import { Entity, Tree, Column, TreeChildren, TreeParent, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Base } from "./base";
import { Product } from './product.entity';

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

    @Field(type => [Product]!, { nullable: true })
    @OneToMany(type => Product, target => target.category)
    products: Product[];
}