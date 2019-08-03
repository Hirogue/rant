import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('IndustryInput')
export class Industry extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => Industry, { nullable: true })
    @TreeParent()
    parent: Industry;

    @Field(type => [Industry]!, { nullable: true })
    @TreeChildren()
    children: Industry[];

}