import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ApplyProduct, Product, User } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_apply_product.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);

          for (let item of res) {
            const apply = new ApplyProduct();

            const product = await connection.getRepository(Product).findOne({ where: { account: item.name } });
            const user = await connection.getRepository(User).findOne({ where: { account: item.credential } });
            apply.applicant = user;
            apply.product = product;

            await connection.getRepository(ApplyProduct).save(apply);
          }
        }
    }
}
