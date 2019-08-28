import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Seo } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/seos.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);

          for (let item of res) {
            const seo = new Seo();
            seo.title = item.title;
            seo.path = item.category_path;
            seo.keywords = item.seo;
            seo.description = item.description;

            await connection.getRepository(Seo).save(seo);
          }
        }
    }
}
