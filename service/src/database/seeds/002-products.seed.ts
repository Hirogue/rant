import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ProductCategory, Product } from "../entities";

export default class CreateProducts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const categoryRepository = connection.getRepository(ProductCategory);

        await factory(Product)({ category: await categoryRepository.findOne({ name: '供应链金融' }) }).seedMany(3);
        await factory(Product)({ category: await categoryRepository.findOne({ name: '旅游产业投资基金' }) }).seedMany(4);
        await factory(Product)({ category: await categoryRepository.findOne({ name: '策略投资' }) }).seedMany(5);
    }
}
