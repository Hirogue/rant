import { sample } from "lodash";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Customer, Metadata } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const area = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '地区' })
        );

        const target = new Customer();
        target.phone = '18770221825';
        target.realname = '66666';
        target.org_type = '运营机构';
        target.company = '江西旅游科技有限责任公司';
        target.source = '2019投融资促进会';
        target.area = sample(area);
        target.ex_info = {
            board_and_lodging: ['dinner5', 'stay5', 'lunch6'],
            participants: [
                { realname: '林1', phone: '112312' },
                { realname: '林2', phone: '112312' },
            ]
        };

        await connection.getRepository(Customer).save(target);

    }
}