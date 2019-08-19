import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Config } from '../../config';
import { IdentityEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../../core/enums';
import { Base } from './base';
import { Capital } from './capital.entity';
import { Metadata } from './metadata.entity';
import { Org } from './org.entity';
import { Product } from './product.entity';
import { Project } from './project.entity';
import { Provider } from './provider.entity';
import { ApplyProvider } from './apply-provider.entity';

@Entity()
@ObjectType()
@InputType('UserInput')
export class User extends Base {

    @Field({ nullable: true })
    @Column({ unique: true })
    @ApiModelProperty({ nullable: true })
    account: string;

    @Exclude({ toPlainOnly: true })
    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    avatar: string;

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
    idcard: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    idcardA: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    idcardB: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    address: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    company: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    org_code: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    business_license: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    profile: string;

    @Field(type => Int, { nullable: true })
    @Column({ type: 'simple-enum', default: UserLevelEnum.V0 })
    @ApiModelProperty({ nullable: true })
    vip: UserLevelEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: IdentityEnum.TOURIST })
    @ApiModelProperty({ nullable: true })
    identity: IdentityEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: UserTypeEnum.PERSONAL })
    @ApiModelProperty({ nullable: true })
    type: UserTypeEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: UserStatusEnum.NORMAL })
    @ApiModelProperty({ nullable: true })
    status: UserStatusEnum;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org, target => target.users)
    @ApiModelProperty({ nullable: true })
    org: Org;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.users)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field(type => [Provider!], { nullable: true })
    @OneToMany(type => Provider, target => target.creator)
    @ApiModelProperty({ nullable: true })
    providers: Provider[];

    @Field(type => [Project!], { nullable: true })
    @OneToMany(type => Project, target => target.creator)
    @ApiModelProperty({ nullable: true })
    projects: Project[];

    @Field(type => [Capital!], { nullable: true })
    @OneToMany(type => Capital, target => target.creator)
    @ApiModelProperty({ nullable: true })
    capitals: Capital[];

    @Field(type => [Product]!, { nullable: true })
    @ManyToMany(type => Product, target => target.applicants)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    apply_products: Product[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.applicants)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    apply_projects: Project[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.applicants)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    apply_capitals: Capital[];

    @Field(type => [ApplyProvider]!, { nullable: true })
    @OneToMany(type => ApplyProvider, target => target.user)
    @JoinTable()
    @ApiModelProperty({ nullable: true })
    apply_providers: ApplyProvider[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hideName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hidePhone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    hideCompany: string;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
