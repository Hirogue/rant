// import * as moment from 'moment';
// import { Field, InputType, Int, ObjectType } from "type-graphql";
// import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
// import { IFModeEnum, ProjectStatusEnum } from "../../core";
// import { Base } from "./base";
// import { Metadata } from "./metadata.entity";
// import { User } from "./user.entity";

// @Entity()
// @ObjectType()
// @InputType('CapitalInput')
// export class Capital extends Base {

//     @Field({ nullable: true })
//     @Column()
//     title: string;

//     @Field({ nullable: true })
//     @Column()
//     cover: string;

//     @Field(type => Int, { nullable: true })
//     @Column({ default: 0 })
//     views: number;

//     @Field({ nullable: true })
//     @Column()
//     contact: string;

//     @Field({ nullable: true })
//     @Column()
//     phone: string;

//     @Field({ nullable: true })
//     @Column()
//     company: string;

//     @Field({ nullable: true })
//     @Column()
//     payment: string;

//     @Field({ nullable: true })
//     @Column()
//     pledge: string;

//     @Field({ nullable: true })
//     @Column({ type: 'datetime', nullable: true, default: moment().format('YYYY-MM-DD HH:mm:ss') })
//     publish_at: string;

//     @Field({ nullable: true })
//     @Column()
//     amount: number;

//     @Field({ nullable: true })
//     @Column({ type: 'text', nullable: true })
//     info: string;

//     @Field(type => User, { nullable: true })
//     @ManyToOne(type => User, target => target.capitals)
//     creator: User;

//     @Field({ nullable: true })
//     @Column({ type: 'simple-enum', default: ProjectStatusEnum.PENDING })
//     status: ProjectStatusEnum;

//     @Field({ nullable: true })
//     @Column({ type: 'simple-enum', default: IFModeEnum.EQUITY })
//     category: IFModeEnum;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToMany(type => Metadata, target => target.capitals)
//     @JoinTable()
//     industry: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToMany(type => Metadata, target => target.capitals)
//     @JoinTable()
//     capital_type: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     area: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToMany(type => Metadata, target => target.capitals)
//     @JoinTable()
//     invest_area: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     equity_type: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToMany(type => Metadata, target => target.capitals)
//     @JoinTable()
//     stage: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     term: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToMany(type => Metadata, target => target.capitals)
//     @JoinTable()
//     invest_type: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     ratio: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     @JoinTable()
//     data: Metadata[];

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     return: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     risk: Metadata;

//     @Field(type => Metadata, { nullable: true })
//     @ManyToOne(type => Metadata, target => target.capitals)
//     discount_rate: Metadata;
// }