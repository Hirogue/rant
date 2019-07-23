import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { UserStatusEnum, IdentityEnum } from '../../common/core/enums';
import { Config } from '../../config';
import { Base } from './base';

@Entity()
@ObjectType()
export class User extends Base {

    @Field()
    @Column({ unique: true })
    account: String;

    @Exclude({ toPlainOnly: true })
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

    @Field()
    @Column({ type: 'simple-enum', default: IdentityEnum.TOURIST })
    identity: IdentityEnum;

    @Field()
    @Column({ type: 'simple-enum', default: UserStatusEnum.NORMAL })
    status: UserStatusEnum;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
