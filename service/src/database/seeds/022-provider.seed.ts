import * as csv from 'csvtojson';
import { existsSync } from "fs";
import { sample } from "lodash";
import { join } from "path";
import { Connection, Like } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ProjectStatusEnum } from "../../core";
import { Metadata, Provider, ProviderCategory, User } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_services.csv';
        // 判断 csv 文件夹是否存在

        const user = await connection.getRepository(User).findOne({ where: { account: 'SuperAdmin' } });

        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);
            for (let item of res) {

                if (!['评估机构', '会计事务所', '律师事务所', '运营机构', '策划机构', '宣传机构', '其他'].includes(item.category)) continue;

                const category = await connection.getRepository(ProviderCategory).findOne({ where: { title: item.category } });

                const creator = await connection.getRepository(User).findOne({ where: { account: item.credential } });

                const area = await connection.getRepository(Metadata).findOne({ where: { title: Like(`${item.area}%`) } });

                const thumbnail = item.thumbnail ? JSON.parse(item.thumbnail) : null;

                const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;

                await factory(Provider)({
                    name: item.name,
                    logo: thumbnail ? thumbnail.url : null,
                    introduction: ex_info ? ex_info.richtext ? ex_info.richtext.html : null : null,
                    area,
                    creator,
                    category,
                    status: ProjectStatusEnum.CHECKED
                }).seed();
            }
        } else {
            const cate1 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '评估机构' } });
            const cate2 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '会计事务所' } });
            const cate3 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '律师事务所' } });
            const cate4 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '运营机构' } });
            const cate5 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '策划机构' } });
            const cate6 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '宣传机构' } });
            const cate7 = await connection.getRepository(ProviderCategory).findOne({ where: { title: '其他' } });

            const area = await connection.getTreeRepository(Metadata).findOne({ title: '地区' });
            const areaList = await connection.getTreeRepository(Metadata).findDescendants(area);

            await factory(Provider)({ category: cate1, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate2, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate3, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate4, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate5, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate6, creator: user, area: sample(areaList) }).seedMany(5);
            await factory(Provider)({ category: cate7, creator: user, area: sample(areaList) }).seedMany(5);
        }
    }
}
