import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Org } from "../entities";

export default class CreateOrgs implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const org1 = await factory(Org)({ title: '董事会' }).seed();
        const org2 = await factory(Org)({ title: '总经办', parent: org1 }).seed();

        await factory(Org)({
            title: '子基金部',
            parent: await factory(Org)({ title: '基金部', parent: org2 }).seed()
        }).seedMany(10);

        await factory(Org)({
            title: '子财务部',
            parent: await factory(Org)({ title: '财务部', parent: org2 }).seed()
        }).seedMany(10);

        await factory(Org)({
            title: '子并购业务部',
            parent: await factory(Org)({ title: '并购业务部', parent: org2 }).seed()
        }).seedMany(10);

        await factory(Org)({
            title: '子综合管理部',
            parent: await factory(Org)({ title: '综合管理部', parent: org2 }).seed()
        }).seedMany(10);

        await factory(Org)({
            title: '子投资业务部',
            parent: await factory(Org)({ title: '投资业务部', parent: org2 }).seed()
        }).seedMany(10);

        await factory(Org)({
            title: '子风险管理部',
            parent: await factory(Org)({ title: '风险管理部', parent: org2 }).seed()
        }).seedMany(10);

    }
}
