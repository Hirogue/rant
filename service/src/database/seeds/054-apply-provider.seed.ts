import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ApplyProvider, Provider, User } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_apply_service.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
          const res = await csv().fromFile(filePath);
          //console.log(res);

          for (let item of res) {
            const apply = new ApplyProvider();

            const provider = await connection.getRepository(Provider).findOne({ where: { title: item.name } });
            const user = await connection.getRepository(User).findOne({ where: { account: item.credential } });
            apply.applicant = user;
            apply.provider = provider;

            await connection.getRepository(ApplyProvider).save(apply);
          }
        }
    }
}
