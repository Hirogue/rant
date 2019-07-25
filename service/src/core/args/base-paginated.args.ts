import { Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export abstract class BasePaginatedArgs {
    @Field(type => Int, { nullable: true, defaultValue: 0 })
    @Min(0)
    page: number = 0;

    @Field(type => Int, { nullable: true, defaultValue: 10 })
    @Min(1)
    @Max(1000)
    pageSize: number = 10;

    @Field({ nullable: true })
    keyword: string;
}