import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Area } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const list = [
            '江西', '北京', '天津', '上海', '重庆', '河北', '山西',
            '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建',
            '山东', '河南', '湖北', '湖南', '广东', '海南', '四川',
            '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古',
            '广西', '西藏', '宁夏', '新疆', '香港', '澳门', '海外'
        ];

        for (const item of list) {
            await factory(Area)({ title: item }).seed();
        }
    }
}
