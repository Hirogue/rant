import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyProjectInput')
export class ApplyProject extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_projects)
    applicant: User;

    @Field(type => Project, { nullable: true })
    @ManyToOne(type => Project, target => target.applicants)
    project: Project;

}