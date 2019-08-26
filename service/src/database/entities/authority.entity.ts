import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany } from "typeorm";
import { Base } from "./base";
import { Role } from './role.entity';

@Entity()
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

    @Field(type => [Role], { nullable: true })
    @ManyToMany(type => Role, target => target.authorities)
    @ApiModelProperty({ nullable: true })
    roles: Role[];
}