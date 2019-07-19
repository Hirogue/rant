import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
    @Field()
    account: string;

    @Field()
    password: string;
}