import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Config } from '../../config';
import { IdentityEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../../core/enums';
import { Base } from './base';
import { Metadata } from './metadata.entity';
import { Org } from './org.entity';
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
  @ManyToOne(type => Metadata)
  @ApiModelProperty({ nullable: true })
  area: Metadata;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiModelProperty({ nullable: true })
  area_path: string;

  @Field(type => Role, { nullable: true })
  @ManyToOne(type => Role)
  @ApiModelProperty({ nullable: true })
  role: Role;

  @Field(type => User, { nullable: true })
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
    this.password = await bcrypt.hash(
      this.password || Config.defaultPassword,
      salt,
    );
  }
}
