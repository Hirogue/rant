import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ProductCategory } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ProductCategory)({ title: '供应链金融产品' }).seed();
        await factory(ProductCategory)({ title: '旅游产业投资基金' }).seed();
        await factory(ProductCategory)({ title: '策略投资' }).seed();
    }
}
