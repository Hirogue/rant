import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ArticleCategory, Article } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const cate1 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '行业快讯' } });
        const cate2 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '江旅资讯' } });
        const cate3 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '投融研报' } });
        const cate4 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '投融学堂' } });
        const cate5 = await connection.getRepository(ArticleCategory).findOne({ where: { title: '通知公告' } });

        await factory(Article)({ category: cate1 }).seedMany(25);
        await factory(Article)({ category: cate2 }).seedMany(15);
        await factory(Article)({ category: cate3 }).seedMany(23);
        await factory(Article)({ category: cate4 }).seedMany(12);
        await factory(Article)({ category: cate5 }).seedMany(12);
    }
}
