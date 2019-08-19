import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IFModeEnum, ProjectStatusEnum } from "../../core";
import { ApplyCapital } from './apply-capital.entity';
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('CapitalInput')
export class Capital extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    views: number;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    contact: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    company: string;

    @Field({ nullable: true })
    @Column({ type: 'datetime', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true })
    publish_at: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    amount: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    info: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    return: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    pledge: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    discount: number;

    @Field(type => Int, { nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    term: number;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    pre_payment: string;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.capitals)
    @ApiModelProperty({ nullable: true })
    creator: User;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: IFModeEnum.EQUITY })
    @ApiModelProperty({ nullable: true })
    category: IFModeEnum;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_industry)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    industry: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_type)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    type: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_invest_area)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    invest_area: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true })
    risk: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_data)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    data: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true })
    equity_type: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_stage)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    stage: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.capitals_invest_type)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    invest_type: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true })
    ratio: Metadata;

    @Field(type => ApplyCapital, { nullable: true })
    @OneToMany(type => ApplyCapital, target => target.capital)
    @ApiModelProperty({ nullable: true })
    applicants: ApplyCapital[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hideContact: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hidePhone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hideCompany: string;


}   