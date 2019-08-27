import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Expert } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/experts.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);

          for (let item of res) {
            const thumbnail = item.thumbnail ? JSON.parse(item.thumbnail) : null;
            let company, position;
            const reg = /^\s*/;
            if (!!item.subtitle && reg.test(item.subtitle)) {
              company = item.subtitle.trim().split(/\s+/)[0];
              position = item.subtitle.trim().split(/\s+/)[1];
            }

            const expert = new Expert();
            expert.name = item.pro_name;
            expert.avatar = thumbnail ? thumbnail.url : null;
            expert.category = item.category_name;
            expert.is_published = true;
            expert.company = company;
            expert.position = position;
            expert.info = JSON.parse(item.ex_info).richtext.html.replace(new RegExp('<.+?>', 'g'), '');
            expert.sort = item.sort;

            await connection.getRepository(Expert).save(expert);
          }
        }
    }
}
