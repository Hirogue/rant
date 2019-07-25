import { ObjectType, Field } from "type-graphql";
import { Paginated } from "../core";
import { User } from "../database/entities";

@ObjectType()
export class UserPaginated extends Paginated {
    @Field(type => [User])
    items: User[];
}