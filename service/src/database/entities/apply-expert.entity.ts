import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectStatusEnum } from "../../core";
import { Base } from "./base";
import { Expert } from "./expert.entity";
import { Org } from "./org.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyExpertInput')
export class ApplyExpert extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_experts)
    applicant: User;

    @Field(type => Expert, { nullable: true })
    @ManyToOne(type => Expert, target => target.applicants)
    expert: Expert;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    reason: string;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org)
    @ApiModelProperty({ nullable: true })
    org: Org;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true })
    own: User;

    @Field({ nullable: true })
    @Column({ default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

}