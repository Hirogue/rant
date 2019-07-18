import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class EditTodoInput {
    @Field()
    id: string;

    @Field()
    @MaxLength(30)
    title: string;
}