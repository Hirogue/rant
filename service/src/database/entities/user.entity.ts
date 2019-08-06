import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, InputType, ObjectType, Int } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Config } from '../../config';
import { UserLevelEnum, IdentityEnum, UserStatusEnum } from '../../core/enums';
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
    account: string;

    @Exclude({ toPlainOnly: true })
    @Field({ nullable: true })
    @Column()
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    avatar: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    realname: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    idcard: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    address: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    company: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    profile: string;

    @Field(type => Int, { nullable: true })
    @Column({ type: 'simple-enum', default: UserLevelEnum.V0 })
    vip: UserLevelEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: IdentityEnum.TOURIST })
    identity: IdentityEnum;

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: UserStatusEnum.NORMAL })
    status: UserStatusEnum;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org, target => target.users)
    org: Org;

    @Field(type => [Provider!], { nullable: true })
    @OneToMany(type => Provider, target => target.creator)
    providers: Provider[];

    @Field(type => [Project!], { nullable: true })
    @OneToMany(type => Project, target => target.creator)
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
