import { Connection } from "typeorm";
import * as Faker from 'faker';
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum } from "../../core";
import { User, Org } from "../entities";
import { existsSync } from "fs";
import { join } from "path";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        // const rootPath = join(__dirname, '../../../../csv');
        // const filePath = rootPath + '/dbt_users.csv';
        // // 判断 csv 文件夹是否存在
        // if (existsSync(rootPath) && existsSync(filePath)) {
        //     const res = await csv().fromFile(filePath);
        //     console.log(res);

        //     throw new Error('aaa');
        // }

        const org1 = await connection.getRepository(Org).findOne({ where: { title: '后台' } });
        const org2 = await connection.getRepository(Org).findOne({ where: { title: '基金部' } });
        const org3 = await connection.getRepository(Org).findOne({ where: { title: '投资业务部' } });
        const org4 = await connection.getRepository(Org).findOne({ where: { title: '风险管理部' } });
        const org5 = await connection.getRepository(Org).findOne({ where: { title: '财务部' } });

        const org6 = await connection.getRepository(Org).findOne({ where: { title: '游客' } });
        const org7 = await connection.getRepository(Org).findOne({ where: { title: '项目方' } });
        const org8 = await connection.getRepository(Org).findOne({ where: { title: '资金方' } });
        const org9 = await connection.getRepository(Org).findOne({ where: { title: '服务商' } });

        const superAdmin = new User();
        superAdmin.account = 'SuperAdmin';
        superAdmin.identity = IdentityEnum.USER;
        superAdmin.avatar = Faker.image.avatar();
        superAdmin.realname = 'Super Admin';
        superAdmin.profile = 'A mysterious person with arbitrary authority!';
        superAdmin.org = org1;

        await connection.getRepository(User).save(superAdmin);

        await factory(User)({ identity: IdentityEnum.USER, org: org2 }).seedMany(4);
        await factory(User)({ identity: IdentityEnum.USER, org: org3 }).seedMany(4);
        await factory(User)({ identity: IdentityEnum.USER, org: org4 }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.USER, org: org5 }).seedMany(2);

        await factory(User)({ identity: IdentityEnum.TOURIST, org: org6 }).seedMany(10);
        await factory(User)({ identity: IdentityEnum.FINANCER, org: org7 }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.INVESTOR, org: org8 }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.PROVIDER, org: org9 }).seedMany(10);

    }
}
