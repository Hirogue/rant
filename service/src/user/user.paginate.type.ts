import { ObjectType } from "type-graphql";
import { BasePaginate } from "../../core";
import { User } from "../../database";

@ObjectType()
export class UserPaginate extends BasePaginate(User) { }