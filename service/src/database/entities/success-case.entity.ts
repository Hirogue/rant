import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
@ObjectType()
@InputType('SuccessCaseInput')
export class SuccessCase extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    cover: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    link: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    @ApiModelProperty({ nullable: true })
    is_published: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true })
    publish_at: string;

}