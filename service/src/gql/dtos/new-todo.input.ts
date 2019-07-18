import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewTodoInput {
    @Field()
    @MaxLength(30)
    title: string;
}