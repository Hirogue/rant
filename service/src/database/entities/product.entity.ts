import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { JsonScalar } from "../../core";
import { Base } from "./base";
import { ProductCategory } from "./product-category.entity";

@Entity()
@ObjectType()
@InputType('ProductInput')
export class Product extends Base {

    @Field({ nullable: true })
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column()
    cover: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    flowsheet: string;

    @Field(type => JsonScalar, { nullable: true })
    @Column({ type: 'simple-json', nullable: true })
    flows: any;

    @Field({ nullable: true })
    @Column({ nullable: true })
    slogan: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    advantage: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    introduction: string;

    @Field(type => ProductCategory, { nullable: true })
    @ManyToOne(type => ProductCategory, target => target.products)
    category: ProductCategory;
}