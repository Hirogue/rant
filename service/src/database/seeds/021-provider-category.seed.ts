import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ProviderCategory } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ProviderCategory)({ title: '评估机构' }).seed();
        await factory(ProviderCategory)({ title: '会计事务所' }).seed();
        await factory(ProviderCategory)({ title: '律师事务所' }).seed();
        await factory(ProviderCategory)({ title: '运营机构' }).seed();
        await factory(ProviderCategory)({ title: '策划机构' }).seed();
        await factory(ProviderCategory)({ title: '宣传机构' }).seed();
        await factory(ProviderCategory)({ title: '其他' }).seed();
    }
}
