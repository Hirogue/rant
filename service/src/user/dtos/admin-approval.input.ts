import { Field, InputType } from "type-graphql";
import { User } from "../../database";

@InputType()
export class AdminApprovalInput {

    @Field(type => User)
    user: User;

}