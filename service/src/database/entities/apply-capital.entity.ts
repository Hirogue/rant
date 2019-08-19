import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Capital } from "./capital.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyCapitalInput')
export class ApplyCapital extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_capitals)
    applicant: User;

    @Field(type => Capital, { nullable: true })
    @ManyToOne(type => Capital, target => target.applicants)
    capital: Capital;

}