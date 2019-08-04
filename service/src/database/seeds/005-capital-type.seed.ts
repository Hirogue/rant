import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CapitalType } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const list = [
            '个人资金', '企业资金', 'VC投资', 'PE投资', '小额贷款',
            '典当公司', '担保公司', '金融租赁', '投资公司', '商业银行',
            '基金公司', '证券公司'
        ];

        for (const item of list) {
            await factory(CapitalType)({ title: item }).seed();
        }
    }
}
