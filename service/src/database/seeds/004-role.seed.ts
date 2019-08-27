import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Role } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(Role)({ name: '总经理' }).seed();

        await factory(Role)({ name: '投资部副总' }).seed();
        await factory(Role)({ name: '基金部副总' }).seed();
        await factory(Role)({ name: '市场拓展部副总' }).seed();

        await factory(Role)({ name: '投资部主管' }).seed();
        await factory(Role)({ name: '基金部主管' }).seed();
        await factory(Role)({ name: '市场拓展部主管' }).seed();

        await factory(Role)({ name: '投资部业务员' }).seed();
        await factory(Role)({ name: '基金部业务员' }).seed();
        await factory(Role)({ name: '市场拓展部业务员' }).seed();

    }
}
