import { Field, ObjectType } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { Base } from './base';

@Entity()
@ObjectType()
export class Todo extends Base {

    @Field()
    @Column({ length: 500 })
    title: string;
}