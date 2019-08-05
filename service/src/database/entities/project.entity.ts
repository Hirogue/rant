import * as moment from 'moment';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IFModeEnum, ProjectStatusEnum } from "../../core";
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ProjectInput')
export class Project extends Base {

    @Field({ nullable: true })
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column()
    cover: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    views: number;

    @Field({ nullable: true })
    @Column()
    contact: string;

    @Field({ nullable: true })
    @Column()
    phone: string;

    @Field({ nullable: true })
    @Column()
    company: string;

    @Field({ nullable: true })
    @Column()
    payment: string;

    @Field({ nullable: true })
    @Column({ type: 'datetime', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    publish_at: string;

    @Field({ nullable: true })
    @Column()
    amount: number;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    purposes: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    company_info: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    team_info: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    advantage: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    progress: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    info: string;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.projects)
    creator: User;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: ProjectStatusEnum.PENDING })
    status: ProjectStatusEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: IFModeEnum.EQUITY })
    category: IFModeEnum;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    industry: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    area: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    stage: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.exit_mode_projects)
    @JoinTable()
    exit_mode: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    withdrawal_year: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    ratio: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToMany(type => Metadata, target => target.data_projects)
    @JoinTable()
    data: Metadata[];

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    risk: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    interest: Metadata;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.projects)
    occupancy_time: Metadata;

}