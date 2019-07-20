import * as bcrypt from 'bcryptjs';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Exclude } from 'class-transformer';
import { Base } from './base';
import { Config } from '../../config';

@Entity()
@ObjectType()
export class User extends Base {

    @Field()
    @Column({ unique: true })
    account: String;

    @Exclude({ toPlainOnly: true })
    @Column()
    password: String;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
