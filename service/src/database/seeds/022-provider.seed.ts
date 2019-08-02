import { sample } from "lodash";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Provider, ProviderCategory, User, Area } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const cate1 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '评估机构' } });
        const cate2 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '会计事务所' } });
        const cate3 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '律师事务所' } });
        const cate4 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '运营机构' } });
        const cate5 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '策划机构' } });
        const cate6 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '宣传机构' } });
        const cate7 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '其他' } });

        const user = await connection.getRepository(User).findOne({ where: { account: 'SuperAdmin' } });

        const areaList = await connection.getRepository(Area).find();

        await factory(Provider)({ category: cate1, creator: user, area: sample(areaList) }).seedMany(15);
        await factory(Provider)({ category: cate2, creator: user, area: sample(areaList) }).seedMany(15);
        await factory(Provider)({ category: cate3, creator: user, area: sample(areaList) }).seedMany(23);
        await factory(Provider)({ category: cate4, creator: user, area: sample(areaList) }).seedMany(12);
        await factory(Provider)({ category: cate5, creator: user, area: sample(areaList) }).seedMany(6);
        await factory(Provider)({ category: cate6, creator: user, area: sample(areaList) }).seedMany(34);
        await factory(Provider)({ category: cate7, creator: user, area: sample(areaList) }).seedMany(7);
    }
}
