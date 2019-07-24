import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ProductCategory } from "../entities";

export default class CreateProductCategories implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ProductCategory)({ name: '供应链金融' }).seed();
        await factory(ProductCategory)({ name: '旅游产业投资基金' }).seed();
        await factory(ProductCategory)({ name: '策略投资' }).seed();
    }
}
