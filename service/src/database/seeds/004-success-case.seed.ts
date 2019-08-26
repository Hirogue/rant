import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { SuccessCase } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/success_cases.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);

          for (let item of res) {
            const thumbnail = item.thumbnail ? JSON.parse(item.thumbnail) : null;
            //const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;

            const success_cases = new SuccessCase();
            success_cases.title = item.title;
            success_cases.cover = thumbnail ? thumbnail.url : null;
            success_cases.summary = item.subtitle;
            success_cases.is_published = true;
            success_cases.sort = item.sort;
            success_cases.publish_at = item.release_datetime;

            await connection.getRepository(SuccessCase).save(success_cases);
          }
        }
    }
}
