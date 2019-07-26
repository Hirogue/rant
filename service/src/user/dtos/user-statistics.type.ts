import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class UserStatistics {

    @Field(type => Int)
    all: number;

    @Field(type => Int)
    users: number;

    @Field(type => Int)
    investors: number;

    @Field(type => Int)
    financers: number;

    @Field(type => Int)
    providers: number;

    @Field(type => Int)
    tourists: number;

    @Field(type => Int)
    pendingCount: number;
    
    @Field(type => Int)
    rejectCount: number;
}