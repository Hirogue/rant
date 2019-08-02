import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Provider } from "./provider.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('ProviderCategoryInput')
export class ProviderCategory extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => ProviderCategory, { nullable: true })
    @TreeParent()
    parent: ProviderCategory;

    @Field(type => [ProviderCategory]!, { nullable: true })
    @TreeChildren()
    children: ProviderCategory[];

    @Field(type => [Provider], { nullable: true })
    @OneToMany(type => Provider, target => target.category)
    providers: Provider[];
}