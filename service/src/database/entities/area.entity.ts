import { Base } from "./base";
import { Entity, Column, TreeParent, Tree, TreeChildren, OneToMany } from "typeorm";
import { ObjectType, InputType, Field, Int } from "type-graphql";
import { Provider } from "./provider.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('AreaInput')
export class Area extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => Area, { nullable: true })
    @TreeParent()
    parent: Area;

    @Field(type => [Area]!, { nullable: true })
    @TreeChildren()
    children: Area[];

    @Field(type => [Provider], { nullable: true })
    @OneToMany(type => Provider, target => target.area)
    providers: Provider[];
}