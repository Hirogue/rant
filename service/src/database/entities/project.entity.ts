import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IFModeEnum, ProjectStatusEnum } from "../../core";
import { ApplyProject } from './apply-project.entity';
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { User } from "./user.entity";
import { Org } from './org.entity';

@Entity()
@ObjectType()
@InputType('ProjectInput')
export class Project extends Base {

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    cover: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    views: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    contact: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    company: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    payment: string;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true })
    publish_at: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    amount: number;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    purposes: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    company_info: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    team_info: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    advantage: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    progress: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    info: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    reason: string;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org)
    @ApiModelProperty({ nullable: true })
    org: Org;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true })
    own: User;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.projects)
    @ApiModelProperty({ nullable: true })
    creator: User;

    @Field({ nullable: true })
    @Column({ default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

    @Field({ nullable: true })
    @Column({ default: IFModeEnum.EQUITY })
    @ApiModelProperty({ nullable: true })
    category: IFModeEnum;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    industry: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    stage: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.projects_exit_mode)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    exit_mode: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    withdrawal_year: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    ratio: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.projects_data)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    data: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true })
    risk: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    interest: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    occupancy_time: Metadata;

    @Field(type => ApplyProject, { nullable: true })
    @OneToMany(type => ApplyProject, target => target.project)
    @ApiModelProperty({ nullable: true })
    applicants: ApplyProject[];

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