import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Industry } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const list = [
            '酒店与民宿', '旅游餐饮', '旅行社', '旅游快消品',
            '景区', '旅游康养', '旅游大交通', '智慧旅游', '其他'
        ];

        for (const item of list) {
            await factory(Industry)({ title: item }).seed();
        }
    }
}
