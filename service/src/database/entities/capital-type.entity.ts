import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('CapitalTypeInput')
export class CapitalType extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => CapitalType, { nullable: true })
    @TreeParent()
    parent: CapitalType;

    @Field(type => [CapitalType]!, { nullable: true })
    @TreeChildren()
    children: CapitalType[];
}