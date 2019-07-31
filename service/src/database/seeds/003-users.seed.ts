import { Connection } from "typeorm";
import * as Faker from 'faker';
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum } from "../../core";
import { User, Org } from "../entities";

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const org1 = await connection.getRepository(Org).findOne({ where: { title: '董事会' } });
        const org2 = await connection.getRepository(Org).findOne({ where: { title: '基金部' } });
        const org3 = await connection.getRepository(Org).findOne({ where: { title: '投资业务部' } });
        const org4 = await connection.getRepository(Org).findOne({ where: { title: '风险管理部' } });
        const org5 = await connection.getRepository(Org).findOne({ where: { title: '财务部' } });

        const superAdmin = new User();
        superAdmin.account = 'SuperAdmin';
        superAdmin.identity = IdentityEnum.USER;
        superAdmin.avatar = Faker.image.avatar();
        superAdmin.realname = 'Super Admin';
        superAdmin.profile = 'A mysterious person with arbitrary authority!';
        superAdmin.org = org1;

        await connection.getRepository(User).save(superAdmin);

        await factory(User)({ identity: IdentityEnum.TOURIST }).seedMany(10);
        await factory(User)({ identity: IdentityEnum.USER, org: org2 }).seedMany(4);
        await factory(User)({ identity: IdentityEnum.USER, org: org3 }).seedMany(4);
        await factory(User)({ identity: IdentityEnum.USER, org: org4 }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.USER, org: org5 }).seedMany(2);
        await factory(User)({ identity: IdentityEnum.FINANCER }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.INVESTOR }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.PROVIDER }).seedMany(3);

    }
}
