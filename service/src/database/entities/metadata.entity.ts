import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Provider } from "./provider.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('MetadataInput')
export class Metadata extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => Metadata, { nullable: true })
    @TreeParent()
    parent: Metadata;

    @Field(type => [Metadata]!, { nullable: true })
    @TreeChildren()
    children: Metadata[];

    @Field(type => [Provider]!, { nullable: true })
    providers: Provider[];
}