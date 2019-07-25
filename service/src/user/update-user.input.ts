import { Field, InputType } from 'type-graphql';
import { JsonScalar } from '../core';


@InputType()
export class UpdateUserInput {

    @Field()
    id: String;

    @Field()
    payload: JsonScalar;
}