import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Document, DocumentCategory } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/documents.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);
          const category = await connection.getRepository(DocumentCategory).findOne({ where: { title: '文章管理' } });

          for (let item of res) {
            const thumbnail = item.thumbnail ? JSON.parse(item.thumbnail) : null;
            const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;

            const document = new Document();
            document.title = item.title;
            document.cover = thumbnail ? thumbnail.url : null;
            document.author = item.author;
            document.source = item.subtitle;
            document.summary = item.description;
            document.views = 0;
            document.category = category;
            document.text = ex_info ? ex_info.richtext ? ex_info.richtext.html : '' : '';

            await connection.getRepository(Document).save(document);
          }
        }
    }
}
