import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Org } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const org = await factory(Org)({ title: '平台运营' }).seed();

        const org1 = await factory(Org)({ title: '投资部', parent: org }).seed();

        const org2 = await factory(Org)({ title: '基金部', parent: org }).seed();

        const org3 = await factory(Org)({ title: '市场拓展部', parent: org }).seed();

        await factory(Org)({
            title: '投资一部',
            parent: org1
        }).seed();

        await factory(Org)({
            title: '投资二部',
            parent: org1
        }).seed();

        await factory(Org)({
            title: '基金一部',
            parent: org2
        }).seed();

        await factory(Org)({
            title: '基金二部',
            parent: org2
        }).seed();

        await factory(Org)({
            title: '市场拓展一部',
            parent: org3
        }).seed();

        await factory(Org)({
            title: '市场拓展二部',
            parent: org3
        }).seed();
    }
}
