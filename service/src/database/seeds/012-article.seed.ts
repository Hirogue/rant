import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ArticleCategory, Article } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_contents.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);
            console.log(res);

            for (let item of res) {

                if (!['行业快讯', '江旅资讯', '投融研报', '投融学堂', '通知公告'].includes(item.category_name)) continue;

                const category = await connection.getRepository(ArticleCategory).findOne({ where: { title: item.category_name } });

                const thumbnail = item.thumbnail ? JSON.parse(item.thumbnail) : null;
                const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;

                await factory(Article)({
                    title: item.title,
                    cover: thumbnail ? thumbnail.url : null,
                    create_at: item.created_when,
                    author: item.author,
                    source: item.subtitle,
                    summary: item.description,
                    text: ex_info ? ex_info.richtext ? ex_info.richtext.html : null : null,
                    sort: parseInt(item.sort),
                    publish_at: item.release_datetime,
                    category,
                }).seed();
            }

        } else {

            const cate1 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '行业快讯' } });
            const cate2 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '江旅资讯' } });
            const cate3 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '投融研报' } });
            const cate4 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '投融学堂' } });
            const cate5 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '通知公告' } });

            await factory(Article)({ category: cate1 }).seedMany(10);
            await factory(Article)({ category: cate2 }).seedMany(10);
            await factory(Article)({ category: cate3 }).seedMany(10);
            await factory(Article)({ category: cate4 }).seedMany(12);
            await factory(Article)({ category: cate5 }).seedMany(12);
        }
    }
}
