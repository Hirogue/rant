import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Identity } from '../../common/core/enums';
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

    @Field()
    @Column({ nullable: true })
    avatar: String;

    @Field()
    @Column({ nullable: true })
    realname: String;

    @Field()
    @Column({ nullable: true })
    phone: String;

    @Field()
    @Column({ nullable: true })
    idcard: String;

    @Field()
    @Column({ nullable: true })
    address: String;

    @Field()
    @Column({ nullable: true })
    company: String;

    @Field()
    @Column({ nullable: true })
    profile: String;

    @Field()
    @Column({ type: 'simple-enum', default: Identity.TOURIST })
    identity: Identity;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
