import { ApiModelProperty } from "@nestjs/swagger";
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
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => ProviderCategory, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: ProviderCategory;

    @Field(type => [ProviderCategory]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: ProviderCategory[];

    @Field(type => [Provider], { nullable: true })
    @OneToMany(type => Provider, target => target.category)
    @ApiModelProperty({ nullable: true })
    providers: Provider[];
}