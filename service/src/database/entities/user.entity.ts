import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Config } from '../../config';
import { IdentityEnum, UserLevelEnum, UserStatusEnum } from '../../core/enums';
import { Base } from './base';
// import { Capital } from './capital.entity';
import { Org } from './org.entity';
import { Project } from './project.entity';
import { Provider } from './provider.entity';

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
    address: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    company: string;

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
    @Column({ type: 'simple-enum', default: UserStatusEnum.NORMAL })
    @ApiModelProperty({ nullable: true })
    status: UserStatusEnum;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org, target => target.users)
    @ApiModelProperty({ nullable: true })
    org: Org;

    @Field(type => [Provider!], { nullable: true })
    @OneToMany(type => Provider, target => target.creator)
    @ApiModelProperty({ nullable: true })
    providers: Provider[];

    @Field(type => [Project!], { nullable: true })
    @OneToMany(type => Project, target => target.creator)
    @ApiModelProperty({ nullable: true })
    projects: Project[];

    // @Field(type => [Capital!], { nullable: true })
    // @OneToMany(type => Capital, target => target.creator)
    // capitals: Capital[];

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
