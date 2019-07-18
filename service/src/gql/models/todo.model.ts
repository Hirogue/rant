
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { Paginated } from '../../gql/types';
import { Base } from './base';

@Entity()
@ObjectType()
export class Todo extends Base {

    @Field()
    @Column({ length: 500 })
    title: string;
}

@ObjectType()
export class TodoPaginated extends Paginated {
    @Field(type => [Todo])
    items: Todo[];
}