import * as bcrypt from 'bcryptjs';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Base } from './base.model';
import { Config } from '../../../packages';

@Entity()
export class User extends Base {

    @Column({ unique: true })
    account: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || Config.defaultPassword, salt);
    }
}
