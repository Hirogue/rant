import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Org } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {


        const org2 = await factory(Org)({ title: '总经办' }).seed();

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
