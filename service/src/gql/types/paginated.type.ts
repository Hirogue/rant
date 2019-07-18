import { ObjectType, Field, Int } from "type-graphql";

@ObjectType({ isAbstract: true })
export abstract class Paginated {

    @Field(type => Int)
    total: number;

    @Field(type => Int)
    page: number;

    @Field(type => Int)
    totalPage: number;

    @Field()
    hasMore: boolean;
}



