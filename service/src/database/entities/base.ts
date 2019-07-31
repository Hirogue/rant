import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType, InputType } from 'type-graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class Base {
    @Field(type => ID, { nullable: true })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field({ nullable: true })
    @CreateDateColumn()
    create_at: string;

    @Field({ nullable: true })
    @UpdateDateColumn()
    update_at: string;
}
