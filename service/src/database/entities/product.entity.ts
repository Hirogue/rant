import { Expose } from "class-transformer";
import { Field, ObjectType, Int } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { JsonScalar } from "../../gql/core/json.scalar";
import { Base } from "./base";
import { ProductCategory } from "./product-category.entity";

@Entity()
@ObjectType()
export class Product extends Base {

    @Field()
    @Column()
    name: string;

    @Field(type => Int)
    @Column({ default: 0 })
    sort: number;

    @Field()
    @Column()
    slug: string;

    @Field()
    @Column()
    cover: string;

    @Field()
    @Column()
    image: string;

    @Field()
    @Column({ type: 'text' })
    introduce: string;

    @Field()
    @Column()
    features: string;

    @Column({ type: 'simple-json', nullable: true })
    flows: any;

    @Field({ nullable: true })
    @Expose()
    get flowsJson(): JsonScalar {
        return this.flows || {};
    }

    @Field(type => ProductCategory, { nullable: true })
    @ManyToOne(type => ProductCategory, target => target.products)
    category: ProductCategory;
}