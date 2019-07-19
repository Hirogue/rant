import { ObjectType, Field } from "type-graphql";
import { Paginated } from "./paginated.type";
import { Todo } from "../../database/entities";

@ObjectType()
export class TodoPaginated extends Paginated {
    @Field(type => [Todo])
    items: Todo[];
}