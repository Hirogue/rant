import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('AmountInput')
export class Amount extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => Amount, { nullable: true })
    @TreeParent()
    parent: Amount;

    @Field(type => [Amount]!, { nullable: true })
    @TreeChildren()
    children: Amount[];
}