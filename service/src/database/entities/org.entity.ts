import { Field, ObjectType, InputType, Int } from "type-graphql";
import { Entity, Tree, TreeChildren, TreeParent, Column } from "typeorm";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('OrgInput')
export class Org extends Base {
    @Field()
    @Column()
    title: string;

    @Field(type => Int)
    @Column({ default: 0 })
    sort: number;

    @Field(type => Org, { nullable: true })
    @TreeParent()
    parent: Org;

    @Field(type => [Org]!, { nullable: true })
    @TreeChildren()
    children: Org[];
}