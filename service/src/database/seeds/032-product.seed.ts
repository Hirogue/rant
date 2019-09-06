import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Product, ProductCategory } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {



        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_products.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);
            for (let item of res) {
                const product = new Product();
                product.name = item.name;
                product.slogan = item.title;
                product.cover = item.thumbnail ? JSON.parse(item.thumbnail).url : null;
                const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;
                if (ex_info.hasOwnProperty("thumbnail2")) {
                    product.flowsheet = ex_info.thumbnail2.url;
                }
                product.introduction = ex_info.richtext.html.replace(new RegExp('<.+?>', 'g'), '');
                product.advantage = ex_info.richtext2.html.replace(new RegExp('<.+?>', 'g'), '');
                const category = await connection.getRepository(ProductCategory).findOne({ where: { title: item.category } });
                product.category = category;

                const flows = [];
                //console.log(item.DynamicKV);
                ex_info.DynamicKV.forEach((step, i) => {
                    flows.push({ key: step.key, sort: i, value: step.value });
                });
                product.flows = flows;
                product.is_published = true;

                await connection.getRepository(Product).save(product);

            }
        } else {
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
}
