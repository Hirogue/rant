import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { Authority } from './authority.entity';
import { Base } from "./base";

@Entity()
@ObjectType()
@InputType('RoleInput')
export class Role extends Base {

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field(type => [Authority], { nullable: true })
    @ManyToMany(type => Authority, target => target.roles)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    authorities: Authority[];
}   