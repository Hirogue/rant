import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { LogTypeEnum } from '../../core';
import { Base } from "./base";
import { User } from './user.entity';

@Entity()
@ObjectType()
@InputType('LogInput')
export class Log extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    info: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    target: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    status: string;

    @Field({ nullable: true })
    @Column({ default: LogTypeEnum.PROJECT })
    @ApiModelProperty({ nullable: true })
    type: LogTypeEnum;

    @Field({ nullable: true })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true })
    own: User;
}