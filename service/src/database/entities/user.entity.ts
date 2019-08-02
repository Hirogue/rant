import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, ObjectType, InputType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserStatusEnum, IdentityEnum } from '../../core/enums';
import { Config } from '../../config';
import { Base } from './base';
import { Org } from './org.entity';
import { Provider } from './provider.entity';

@Entity()
@ObjectType()
@InputType('UserInput')
export class User extends Base {

    @Field({ nullable: true })
    @Column({ unique: true })
    account: String;

    @Exclude({ toPlainOnly: true })
    @Field({ nullable: true })
    @Column()
    password: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    avatar: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    realname: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    phone: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    idcard: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    address: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    company: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    profile: String;

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

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
