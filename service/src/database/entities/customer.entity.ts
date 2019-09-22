import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ProjectStatusEnum, JsonScalar } from '../../core';
import { Metadata } from './metadata.entity';

@Entity()
@ObjectType()
@InputType('CustomerInput')
export class Customer extends Base {

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    realname: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    org_type: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    company: string;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    area_path: string;

    @Field(type => JsonScalar, { nullable: true })
    @Column({ type: 'simple-json', nullable: true })
    @ApiModelProperty({ nullable: true })
    ex_info: any;

    @Field({ nullable: true })
    @Column({ nullable: true, default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    source: string;

}
