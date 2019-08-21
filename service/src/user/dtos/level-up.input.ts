import { Field, InputType } from "type-graphql";
import { Capital, Project, Provider, User } from "../../database";

@InputType()
export class LevelUpInput {

    @Field(type => User)
    user: User;

    @Field(type => Provider, { nullable: true })
    provider: Provider;

    @Field(type => Project, { nullable: true })
    project: Project;

    @Field(type => Capital, { nullable: true })
    capital: Capital;

}