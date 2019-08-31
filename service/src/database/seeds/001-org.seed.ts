import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Org } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(Org)({ title: '总经办' }).seed();

        const org1 = await factory(Org)({ title: '投资部' }).seed();

        const org2 = await factory(Org)({ title: '基金部' }).seed();

        const org3 = await factory(Org)({ title: '市场拓展部' }).seed();

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
