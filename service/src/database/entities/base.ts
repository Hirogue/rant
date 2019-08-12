import { ApiModelProperty } from '@nestjs/swagger';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class Base {
    @Field(type => ID, { nullable: true })
    @PrimaryGeneratedColumn('uuid')
    @ApiModelProperty({ nullable: true })
    id: string;

    @Field({ nullable: true })
    @CreateDateColumn()
    @ApiModelProperty({ nullable: true })
    create_at: string;

    @Field({ nullable: true })
    @UpdateDateColumn()
    @ApiModelProperty({ nullable: true })
    update_at: string;
}
