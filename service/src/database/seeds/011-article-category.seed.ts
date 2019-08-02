import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ArticleCategory } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ArticleCategory)({ title: '行业快讯' }).seed();
        await factory(ArticleCategory)({ title: '江旅资讯' }).seed();
        await factory(ArticleCategory)({ title: '投融研报' }).seed();
        await factory(ArticleCategory)({ title: '投融学堂' }).seed();
    }
}
