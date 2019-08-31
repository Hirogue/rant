import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { ApplyExpert } from './apply-expert.entity';

@Entity()
@ObjectType()
@InputType('ExpertInput')
export class Expert extends Base {

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    avatar: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    category: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    company: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    position: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    info: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    @ApiModelProperty({ nullable: true })
    is_published: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => ApplyExpert, { nullable: true })
    @OneToMany(type => ApplyExpert, target => target.expert)
    @ApiModelProperty({ nullable: true })
    applicants: ApplyExpert[];

}