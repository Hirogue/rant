import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Org } from "../entities";

export default class CreateOrgs implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(Org)({ title: '游客' }).seed();

        const org0 = await factory(Org)({ title: '客户' }).seed();

        await factory(Org)({ title: '项目方', parent: org0 }).seed();
        await factory(Org)({ title: '资金方', parent: org0 }).seed();
        await factory(Org)({ title: '服务商', parent: org0 }).seed();

        const org1 = await factory(Org)({ title: '后台' }).seed();

        const org2 = await factory(Org)({ title: '总经办', parent: org1 }).seed();

        const org3 = await factory(Org)({ title: '基金部', parent: org2 }).seed();

        const org4 = await factory(Org)({ title: '投资业务部', parent: org2 }).seed();

        await factory(Org)({
            title: '基金一部',
            parent: org3
        }).seed();

        await factory(Org)({
            title: '基金二部',
            parent: org3
        }).seed();

        await factory(Org)({
            title: '基金三部',
            parent: org3
        }).seed();

        await factory(Org)({
            title: '投资业务一部',
            parent: org4
        }).seed();

        await factory(Org)({
            title: '投资业务二部',
            parent: org4
        }).seed();

    }
}
