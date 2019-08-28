import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('AuthorityInput')
export class Authority extends Base {

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    value: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => Authority, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: Authority;

    @Field(type => [Authority]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: Authority[];
}
