import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Amount } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const list = [
            '10万-100万', '100万-500万', '500万-1000万',
            '1000万-5000万', '5000万-1亿', '1亿-5亿', '5亿以上'
        ];

        for (const item of list) {
            await factory(Amount)({ title: item }).seed();
        }
    }
}
