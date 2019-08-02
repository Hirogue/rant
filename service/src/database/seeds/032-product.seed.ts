import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Product, ProductCategory } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const cate1 = await connection.getRepository(ProductCategory).findOne({ where: { title: '供应链金融产品' } });
        const cate2 = await connection.getRepository(ProductCategory).findOne({ where: { title: '旅游产业投资基金' } });
        const cate3 = await connection.getRepository(ProductCategory).findOne({ where: { title: '策略投资' } });

        const flows = [
            { value: 'step 1', sort: 0 },
            { value: 'step 2', sort: 1 },
            { value: 'step 3', sort: 2 },
            { value: 'step 4', sort: 3 },
            { value: 'step 5', sort: 4 },
        ];

        await factory(Product)({ category: cate1, flows }).seedMany(15);
        await factory(Product)({ category: cate2, flows }).seedMany(16);
        await factory(Product)({ category: cate3, flows }).seedMany(5);
    }
}
