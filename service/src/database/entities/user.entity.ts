import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Config } from '../../config';
import { IdentityEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../../core/enums';
import { ApplyCapital } from './apply-capital.entity';
import { ApplyExpert } from './apply-expert.entity';
import { ApplyProduct } from './apply-product.entity';
import { ApplyProject } from './apply-project.entity';
import { ApplyProvider } from './apply-provider.entity';
import { Base } from './base';
import { Capital } from './capital.entity';
import { Metadata } from './metadata.entity';
import { Org } from './org.entity';
import { Project } from './project.entity';
import { Provider } from './provider.entity';
import { Role } from './role.entity';

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

    @Exclude({ toPlainOnly: true })
    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    lastPassword: string;

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

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    reason: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    @ApiModelProperty({ nullable: true })
    isSuperAdmin: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: UserLevelEnum.V0 })
    @ApiModelProperty({ nullable: true })
    vip: UserLevelEnum;

    @Field({ nullable: true })
    @Column({ default: IdentityEnum.TOURIST })
    @ApiModelProperty({ nullable: true })
    identity: IdentityEnum;

    @Field({ nullable: true })
    @Column({ default: UserTypeEnum.PERSONAL })
    @ApiModelProperty({ nullable: true })
    type: UserTypeEnum;

    @Field(type => Int, { nullable: true })
    @Column({ default: UserStatusEnum.NORMAL })
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

    @Field(type => [ApplyProduct]!, { nullable: true })
    @OneToMany(type => ApplyProduct, target => target.applicant)
    @ApiModelProperty({ nullable: true })
    apply_products: ApplyProduct[];

    @Field(type => [ApplyProject]!, { nullable: true })
    @OneToMany(type => ApplyProject, target => target.applicant)
    @ApiModelProperty({ nullable: true })
    apply_projects: ApplyProject[];

    @Field(type => [ApplyCapital]!, { nullable: true })
    @OneToMany(type => ApplyCapital, target => target.applicant)
    @ApiModelProperty({ nullable: true })
    apply_capitals: ApplyCapital[];

    @Field(type => [ApplyProvider]!, { nullable: true })
    @OneToMany(type => ApplyProvider, target => target.applicant)
    @ApiModelProperty({ nullable: true })
    apply_providers: ApplyProvider[];

    @Field(type => [ApplyExpert]!, { nullable: true })
    @OneToMany(type => ApplyExpert, target => target.applicant)
    @ApiModelProperty({ nullable: true })
    apply_experts: ApplyExpert[];

    @Field(type => Role, { nullable: true })
    @ManyToOne(type => Role, target => target.users)
    @ApiModelProperty({ nullable: true })
    role: Role;

    @Field({ nullable: true })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true })
    own: User;

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
