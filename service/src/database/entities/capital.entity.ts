import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IFModeEnum, ProjectStatusEnum } from "../../core";
import { ApplyCapital } from './apply-capital.entity';
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { Org } from './org.entity';
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('CapitalInput')
export class Capital extends Base {

    @Field({ nullable: true, description: '标题' })
    @Column({ nullable: true, comment: '标题' })
    @ApiModelProperty({ nullable: true, description: '标题' })
    title: string;

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

    @Field({ nullable: true, description: '发布时间' })
    @Column({ type: 'timestamp', comment: '发布时间', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    @ApiModelProperty({ nullable: true, description: '发布时间' })
    publish_at: string;

    @Field({ nullable: true, description: '投资金额' })
    @Column({ nullable: true, comment: '投资金额', type: 'int' })
    @ApiModelProperty({ nullable: true, description: '投资金额' })
    amount: number;

    @Field({ nullable: true, description: '摘要' })
    @Column({ nullable: true, comment: '摘要' })
    @ApiModelProperty({ nullable: true, description: '摘要' })
    summary: string;

    @Field({ nullable: true, description: '资金详情' })
    @Column({ type: 'text', nullable: true, comment: '资金详情' })
    @ApiModelProperty({ nullable: true, description: '资金详情' })
    info: string;

    @Field({ nullable: true, description: '最低回报要求' })
    @Column({ nullable: true, comment: '最低回报要求' })
    @ApiModelProperty({ nullable: true, description: '最低回报要求' })
    return: string;

    @Field({ nullable: true, description: '抵质押物类型' })
    @Column({ nullable: true, comment: '抵质押物类型' })
    @ApiModelProperty({ nullable: true, description: '抵质押物类型' })
    pledge: string;

    @Field({ nullable: true, description: '抵质押物折扣率' })
    @Column({ type: 'float', nullable: true, comment: '抵质押物折扣率' })
    @ApiModelProperty({ nullable: true, description: '抵质押物折扣率' })
    discount: number;

    @Field(type => Int, { nullable: true, description: '投资期限' })
    @Column({ nullable: true, comment: '投资期限' })
    @ApiModelProperty({ nullable: true, description: '投资期限' })
    term: number;

    @Field({ nullable: true, description: '前期费用' })
    @Column({ nullable: true, comment: '前期费用' })
    @ApiModelProperty({ nullable: true, description: '前期费用' })
    pre_payment: string;

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
    @ManyToOne(type => User, target => target.capitals)
    @ApiModelProperty({ nullable: true, description: '创建人' })
    creator: User;

    @Field({ nullable: true, description: '状态' })
    @Column({ default: ProjectStatusEnum.PENDING, comment: '状态' })
    @ApiModelProperty({ nullable: true, description: '状态' })
    status: ProjectStatusEnum;

    @Field({ nullable: true, description: '投资方式' })
    @Column({ default: IFModeEnum.EQUITY, comment: '投资方式' })
    @ApiModelProperty({ nullable: true, description: '投资方式' })
    category: IFModeEnum;

    @Field(type => Metadata, { nullable: true, description: '行业' })
    @ManyToMany(type => Metadata, target => target.capitals_industry)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '行业' })
    industry: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '资金类型' })
    @ManyToMany(type => Metadata, target => target.capitals_type)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '资金类型' })
    type: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '所在地区' })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true, description: '所在地区' })
    area: Metadata;

    @Field({ nullable: true, description: '路径' })
    @Column({ nullable: true, comment: '路径' })
    @ApiModelProperty({ nullable: true, description: '路径' })
    area_path: string;

    @Field(type => Metadata, { nullable: true, description: '投资地区' })
    @ManyToMany(type => Metadata, target => target.capitals_invest_area)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '投资地区' })
    invest_area: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '风控要求' })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true, description: '风控要求' })
    risk: Metadata;

    @Field(type => Metadata, { nullable: true, description: '可提供资料' })
    @ManyToMany(type => Metadata, target => target.capitals_data)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '可提供资料' })
    data: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '参股类型' })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true, description: '参股类型' })
    equity_type: Metadata;

    @Field(type => Metadata, { nullable: true, description: '投资阶段' })
    @ManyToMany(type => Metadata, target => target.capitals_stage)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '投资阶段' })
    stage: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '投资类型' })
    @ManyToMany(type => Metadata, target => target.capitals_invest_type)
    @JoinTable()
    @ApiModelProperty({ nullable: true, description: '投资类型' })
    invest_type: Metadata[];

    @Field(type => Metadata, { nullable: true, description: '占股比例' })
    @ManyToOne(type => Metadata, target => target.capitals)
    @ApiModelProperty({ nullable: true, description: '占股比例' })
    ratio: Metadata;

    @Field(type => ApplyCapital, { nullable: true, description: '申请人列表' })
    @OneToMany(type => ApplyCapital, target => target.capital)
    @ApiModelProperty({ nullable: true, description: '申请人列表' })
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