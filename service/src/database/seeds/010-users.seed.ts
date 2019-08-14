import * as Faker from 'faker';
import { sample } from "lodash";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum, UserTypeEnum, UserStatusEnum } from "../../core";
import { Metadata, Org, User } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const org1 = await connection.getRepository(Org).findOne({ where: { title: '后台' } });
        const org2 = await connection.getRepository(Org).findOne({ where: { title: '基金部' } });
        const org3 = await connection.getRepository(Org).findOne({ where: { title: '投资业务部' } });
        const org4 = await connection.getRepository(Org).findOne({ where: { title: '风险管理部' } });
        const org5 = await connection.getRepository(Org).findOne({ where: { title: '财务部' } });

        const org6 = await connection.getRepository(Org).findOne({ where: { title: '游客' } });
        const org7 = await connection.getRepository(Org).findOne({ where: { title: '项目方' } });
        const org8 = await connection.getRepository(Org).findOne({ where: { title: '资金方' } });
        const org9 = await connection.getRepository(Org).findOne({ where: { title: '服务商' } });

        const area = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '地区' })
        );

        const typeList = Object.keys(UserTypeEnum).map(key => key);
        const status = Object.keys(UserStatusEnum).map(key => key);

        const superAdmin = new User();
        superAdmin.account = 'SuperAdmin';
        superAdmin.identity = IdentityEnum.USER;
        superAdmin.avatar = Faker.image.avatar();
        superAdmin.realname = 'Super Admin';
        superAdmin.profile = 'A mysterious person with arbitrary authority!';
        superAdmin.org = org1;

        await connection.getRepository(User).save(superAdmin);

        await factory(User)({
            identity: IdentityEnum.USER,
            org: org2,
            area: sample(area)
        }).seedMany(4);

        await factory(User)({
            identity: IdentityEnum.USER,
            org: org3,
            area: sample(area)
        }).seedMany(4);

        await factory(User)({
            identity: IdentityEnum.USER,
            org: org4,
            area: sample(area)
        }).seedMany(5);

        await factory(User)({
            identity: IdentityEnum.USER,
            org: org5,
            area: sample(area)
        }).seedMany(2);

        await factory(User)({
            identity: IdentityEnum.TOURIST,
            org: org6,
            area: sample(area)
        }).seedMany(10);

        await factory(User)({
            identity: IdentityEnum.FINANCER,
            org: org7,
            area: sample(area),
            type: UserTypeEnum[sample(typeList)],
            status: UserStatusEnum[sample(status)],
        }).seedMany(5);

        await factory(User)({
            identity: IdentityEnum.INVESTOR,
            org: org8,
            area: sample(area),
            type: UserTypeEnum[sample(typeList)],
            status: UserStatusEnum[sample(status)],
        }).seedMany(5);

        await factory(User)({
            identity: IdentityEnum.PROVIDER,
            org: org9,
            area: sample(area),
            type: UserTypeEnum[sample(typeList)],
            status: UserStatusEnum[sample(status)],
        }).seedMany(10);

    }
}
