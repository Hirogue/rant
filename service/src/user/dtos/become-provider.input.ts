import { Field, InputType } from "type-graphql";
import { Provider, User } from "../../database";

@InputType()
export class BecomeProviderInput {
    @Field(type => User)
    user: User;

    @Field(type => Provider)
    provider: Provider;
}