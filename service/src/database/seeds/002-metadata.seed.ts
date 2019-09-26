import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Metadata } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        let parent = null;
        let list = [];

        parent = await factory(Metadata)({ title: '地区' }).seed();
        
        const area = require('../seeds/area.json');
        for (const province of area) {
            const province_data = await factory(Metadata)({ title: province.name, parent }).seed();
            //console.log('province_data:' + province_data);
            if (province.cityList.length > 0) {
                for (const city of province.cityList) {
                    const city_data = await factory(Metadata)({ title: city.name, parent:province_data }).seed();
                    if (city.areaList.length > 0) {
                        for (const county of city.areaList) {
                            await factory(Metadata)({ title: county.name, parent:city_data }).seed();
                        }
                    }
                }
            }

        }
        
        /*
        list = [
            '江西', '北京', '天津', '上海', '重庆', '河北', '山西',
            '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建',
            '山东', '河南', '湖北', '湖南', '广东', '海南', '四川',
            '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古',
            '广西', '西藏', '宁夏', '新疆', '香港', '澳门', '海外'
        ];
        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }
        */

        parent = await factory(Metadata)({ title: '行业' }).seed();
        list = [
            '酒店与民宿', '旅游餐饮', '旅行社', '旅游快消品',
            '景区', '旅游康养', '旅游大交通', '智慧旅游', '其他'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '资金类型' }).seed();
        list = [
            '个人资金', '企业资金', 'VC投资', 'PE投资', '小额贷款',
            '典当公司', '担保公司', '金融租赁', '投资公司', '商业银行',
            '基金公司', '证券公司', '信托公司', '资产管理', '其他公司'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '金额' }).seed();
        list = [
            '10万-100万', '100万-500万', '500万-1000万',
            '1000万-5000万', '5000万-1亿', '1亿-5亿', '5亿以上'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '阶段' }).seed();
        list = [
            '种子期', '初创期', '成长期', '扩张期', '成熟期', 'Pre-IPO'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '比例' }).seed();
        list = [
            '5%以内', '5%-10%', '10%-34%', '34%-51%', '51%以上'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '利息' }).seed();
        list = [
            '10%以内', '10%-15%', '15%-24%', '其他'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '年限' }).seed();
        list = [
            '1年', '3年', '5年', '10年', '其他'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '时长' }).seed();
        list = [
            '1年以内', '1年-3年', '3年-5年', '5年-10年', '10年以上'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '风控' }).seed();
        list = [
            '抵押', '担保', '信用', '其他'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '投资类型' }).seed();
        list = [
            '独资/投资建厂', '股权合作', '收购/并购', '其他合作方式'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '退出方式' }).seed();
        list = [
            '首次公开发行', '买壳或借壳上市', '二次出售', '破产清算', '管理层回购'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '可提供资料' }).seed();
        list = [
            '项目/商业计划书', '公司证件', '相关财务资料', '其他资料'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }

        parent = await factory(Metadata)({ title: '参股类型' }).seed();
        list = [
            '控股', '参股合作'
        ];

        for (const item of list) {
            await factory(Metadata)({ title: item, parent }).seed();
        }
    }
}
