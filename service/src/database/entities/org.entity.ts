import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { User } from "./user.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('OrgInput')
export class Org extends Base {
    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => Org, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: Org;

    @Field(type => [Org]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: Org[];

    @Field(type => [User]!, { nullable: true })
    @OneToMany(type => User, target => target.org)
    @ApiModelProperty({ nullable: true })
    users: User[];
}