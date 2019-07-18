import { Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class TodoArgs {
    @Field(type => Int)
    @Min(0)
    page: number = 0;
}