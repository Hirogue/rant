import { Field, InputType } from 'type-graphql';
import { JsonScalar } from '../core/json.scalar';


@InputType()
export class UpdateUserInput {

    @Field()
    id: String;

    @Field()
    payload: JsonScalar;
}