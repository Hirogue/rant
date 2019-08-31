import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Expert } from "./expert.entity";
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
    @Column({ type: 'boolean', default: false })
    @ApiModelProperty({ nullable: true })
    is_handled: boolean;

}