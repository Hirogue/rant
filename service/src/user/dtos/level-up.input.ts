import { Field, InputType } from "type-graphql";
import { Provider, User } from "../../database";

@InputType()
export class LevelUpInput {

    @Field(type => User)
    user: User;

    @Field(type => Provider, { nullable: true })
    provider: Provider;

}