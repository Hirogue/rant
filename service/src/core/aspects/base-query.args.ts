import { Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class BaseQueryArgs {

    @Field({ nullable: true })
    filter?: string;

    @Field({ nullable: true })
    or?: string;

    @Field({ nullable: true })
    sort?: string;

    @Field({ nullable: true })
    join?: string;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    page: number = 0;

    @Field(type => Int, { nullable: true, defaultValue: 10 })
    @Min(1)
    @Max(1000)
    limit: number = 10;

    @Field(type => Int, { nullable: true })
    offset?: number;

    @Field(type => Int, { nullable: true })
    cache?: number;
}