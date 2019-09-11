import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IFModeEnum, ProjectStatusEnum } from "../../core";
import { ApplyProject } from './apply-project.entity';
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { Org } from './org.entity';
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ProjectInput')
export class Project extends Base {

    @Field({ nullable: true, description: '标题' })
    @Column({ nullable: true, comment: '标题' })
    @ApiModelProperty({ nullable: true, description: '标题' })
    title: string;

    @Field({ nullable: true, description: '封面' })
    @Column({ nullable: true, comment: '封面' })
    @ApiModelProperty({ nullable: true, description: '封面' })
    cover: string;

    @Field(type => Int, { nullable: true, description: '浏览量' })
    @Column({ default: 0, comment: '浏览量' })
    @ApiModelProperty({ nullable: true, description: '浏览量' })
    views: number;

    @Field({ nullable: true, description: '联系人' })
    @Column({ nullable: true, comment: '联系人' })
    @ApiModelProperty({ nullable: true, description: '联系人' })
    contact: string;

    @Field({ nullable: true, description: '联系电话' })
    @Column({ nullable: true, comment: '联系电话' })
    @ApiModelProperty({ nullable: true, description: '联系电话' })
    phone: string;

    @Field({ nullable: true, description: '企业名称' })
    @Column({ nullable: true, comment: '企业名称' })
    @ApiModelProperty({ nullable: true, description: '企业名称' })
    company: string;

    @Field({ nullable: true, description: '还款来源' })
    @Column({ nullable: true, comment: '还款来源' })
    @ApiModelProperty({ nullable: true, description: '还款来源' })
    payment: string;

    @Field({ nullable: true, description: '发布时间' })
    @Column({ type: 'timestamp', comment: '发布时间', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true, description: '发布时间' })
    publish_at: string;

    @Field({ nullable: true, description: '融资金额' })
    @Column({ nullable: true, type: 'int', comment: '融资金额' })
    @ApiModelProperty({ nullable: true, description: '融资金额' })
    amount: number;

    @Field({ nullable: true, description: '融资用途' })
    @Column({ type: 'text', nullable: true, comment: '融资用途' })
    @ApiModelProperty({ nullable: true, description: '融资用途' })
    purposes: string;

    @Field({ nullable: true, description: '企业介绍' })
    @Column({ type: 'text', nullable: true, comment: '企业介绍' })
    @ApiModelProperty({ nullable: true, description: '企业介绍' })
    company_info: string;

    @Field({ nullable: true, description: '团队介绍' })
    @Column({ type: 'text', nullable: true, comment: '团队介绍' })
    @ApiModelProperty({ nullable: true, description: '团队介绍' })
    team_info: string;

    @Field({ nullable: true, description: '项目优势' })
    @Column({ type: 'text', nullable: true, comment: '项目优势' })
    @ApiModelProperty({ nullable: true, description: '项目优势' })
    advantage: string;

    @Field({ nullable: true, description: '项目进展' })
    @Column({ type: 'text', nullable: true, comment: '项目进展' })
    @ApiModelProperty({ nullable: true, description: '项目进展' })
    progress: string;

    @Field({ nullable: true, description: '摘要' })
    @Column({ nullable: true, comment: '摘要' })
    @ApiModelProperty({ nullable: true, description: '摘要' })
    summary: string;

    @Field({ nullable: true, description: '项目介绍' })
    @Column({ type: 'text', nullable: true, comment: '项目介绍' })
    @ApiModelProperty({ nullable: true, description: '项目介绍' })
    info: string;

    @Field({ nullable: true, description: '驳回理由' })
    @Column({ nullable: true, comment: '驳回理由' })
    @ApiModelProperty({ nullable: true, description: '驳回理由' })
    reason: string;

    @Field(type => Org, { nullable: true, description: '所属部门' })
    @ManyToOne(type => Org)
    @ApiModelProperty({ nullable: true, description: '所属部门' })
    org: Org;

    @Field(type => User, { nullable: true, description: '所属业务员' })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true, description: '所属业务员' })
    own: User;

    @Field(type => User, { nullable: true, description: '创建人' })
    @ManyToOne(type => User, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '创建人' })
    creator: User;

    @Field({ nullable: true, description: '状态' })
    @Column({ default: ProjectStatusEnum.PENDING, comment: '状态' })
    @ApiModelProperty({ nullable: true, description: '状态' })
    status: ProjectStatusEnum;

    @Field({ nullable: true, description: '分类' })
    @Column({ default: IFModeEnum.EQUITY, comment: '分类' })
    @ApiModelProperty({ nullable: true, description: '分类' })
    category: IFModeEnum;

    @Field(type => Metadata, { nullable: true, description: '行业' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '行业' })
    industry: Metadata;

    @Field(type => Metadata, { nullable: true, description: '地区' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '地区' })
    area: Metadata;

    @Field({ nullable: true, description: '路径' })
    @Column({ nullable: true, comment: '路径' })
    @ApiModelProperty({ nullable: true, description: '路径' })
    area_path: string;

    @Field(type => Metadata, { nullable: true, description: '阶段' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '阶段' })
    stage: Metadata;

    @Field(type => Metadata, { nullable: true, description: '退出方式' })
    @ManyToMany(type => Metadata, target => target.projects_exit_mode)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '退出方式' })
    exit_mode: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '最短退出年限' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '最短退出年限' })
    withdrawal_year: Metadata;

    @Field(type => Metadata, { nullable: true, description: '占股比例' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '占股比例' })
    ratio: Metadata;

    @Field(type => Metadata, { nullable: true, description: '可提供资料' })
    @ManyToMany(type => Metadata, target => target.projects_data)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '可提供资料' })
    data: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '风控要求' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '风控要求' })
    risk: Metadata;

    @Field(type => Metadata, { nullable: true, description: '承担利息' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '承担利息' })
    interest: Metadata;

    @Field(type => Metadata, { nullable: true, description: '资金占用时长' })
    @ManyToOne(type => Metadata, target => target.projects)
    @ApiModelProperty({ nullable: true, description: '资金占用时长' })
    occupancy_time: Metadata;

    @Field(type => ApplyProject, { nullable: true, description: '申请人列表' })
    @OneToMany(type => ApplyProject, target => target.project)
    @ApiModelProperty({ nullable: true, description: '申请人列表' })
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