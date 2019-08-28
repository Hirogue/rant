import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { DocumentCategory } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(DocumentCategory)({ title: '文章管理' }).seed();
        //await factory(DocumentCategory)({ title: '江旅资讯' }).seed();
        //await factory(DocumentCategory)({ title: '投融研报' }).seed();
        //await factory(DocumentCategory)({ title: '投融学堂' }).seed();
        //await factory(DocumentCategory)({ title: '通知公告' }).seed();
    }
}
