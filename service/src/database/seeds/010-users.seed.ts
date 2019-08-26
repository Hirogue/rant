import * as Faker from 'faker';
import { sample } from "lodash";
import { Connection, Like } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum, UserTypeEnum, UserStatusEnum } from "../../core";
import { Metadata, Org, User } from "../entities";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const org1 = await connection.getRepository(Org).findOne({ where: { title: '后台' } });
        const org2 = await connection.getRepository(Org).findOne({ where: { title: '基金部' } });
        const org3 = await connection.getRepository(Org).findOne({ where: { title: '投资业务部' } });
        const org4 = await connection.getRepository(Org).findOne({ where: { title: '风险管理部' } });
        const org5 = await connection.getRepository(Org).findOne({ where: { title: '财务部' } });

        const org6 = await connection.getRepository(Org).findOne({ where: { title: '游客' } });
        const org7 = await connection.getRepository(Org).findOne({ where: { title: '项目方' } });
        const org8 = await connection.getRepository(Org).findOne({ where: { title: '资金方' } });
        const org9 = await connection.getRepository(Org).findOne({ where: { title: '服务商' } });

        const area = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '地区' })
        );

        const typeList = Object.keys(UserTypeEnum).map(key => key);
        const status = Object.keys(UserStatusEnum).map(key => key);

        const superAdmin = new User();
        superAdmin.account = 'SuperAdmin';
        superAdmin.identity = IdentityEnum.USER;
        superAdmin.avatar = Faker.image.avatar();
        superAdmin.realname = 'Super Admin';
        superAdmin.profile = 'A mysterious person with arbitrary authority!';
        superAdmin.org = org1;

        await connection.getRepository(User).save(superAdmin);

        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_users.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);
            console.log(res);

            for (let item of res) {

                if (item.row_status == "DELETED") continue;
                
                const user = new User();
                user.password = item.password;
                user.lastPassword = item.password;
                user.account = item.credential;
                user.realname = item.real_name;
                user.phone = item.phonenumber;
                user.vip = item.vip;
                user.create_at = item.created_when;

                const area = await connection.getRepository(Metadata).findOne({ where: { title: Like(`${item.area}%` ), } });
                user.area = area;

                if (item.id_name == "游客") {
                    user.identity = IdentityEnum.TOURIST;
                    user.org = org6;
                } else if (item.id_name == "项目方") {
                    user.identity = IdentityEnum.FINANCER;
                    user.org = org7;
                } else if (item.id_name == "资金方") {
                    user.identity = IdentityEnum.INVESTOR;
                    user.org = org8;
                } else  if (item.id_name == "服务商") {
                    user.identity = IdentityEnum.PROVIDER;
                    user.org = org9;
                } else {
                    user.identity = IdentityEnum.USER;
                    user.org = org6;
                }
                
                if (item.id_type == "个人") {
                    user.type = UserTypeEnum.PERSONAL;
                    user.idcard = item.org_name;
                    user.idcardA = item.idcard_a ? JSON.parse(item.idcard_a).url : null;
                    user.idcardB = item.idcard_b ? JSON.parse(item.idcard_b).url : null;
                } else if (item.id_type == "企业") {
                    user.type = UserTypeEnum.ENTERPRISE;
                    user.business_license = item.org_img ? JSON.parse(item.org_img).url : null;
                    user.company = item.nick_name;
                    user.org_code = item.org_name;
                }

                if (item.status == "PENDING") {
                    user.status = UserStatusEnum.PENDING;
                } else if (item.status == "REJECT") {
                    user.status = UserStatusEnum.REJECTED;
                } else if (item.status == "FOLLOW") {
                    user.status = UserStatusEnum.PENDING;
                } else if (item.status == "OVER") {
                    user.status = UserStatusEnum.CHECKED;
                }


                await connection.getRepository(User).save(user);

            }
        } else {
            await factory(User)({
                identity: IdentityEnum.USER,
                org: org2,
                area: sample(area)
            }).seedMany(4);
    
            await factory(User)({
                identity: IdentityEnum.USER,
                org: org3,
                area: sample(area)
            }).seedMany(4);
    
            await factory(User)({
                identity: IdentityEnum.USER,
                org: org4,
                area: sample(area)
            }).seedMany(5);
    
            await factory(User)({
                identity: IdentityEnum.USER,
                org: org5,
                area: sample(area)
            }).seedMany(2);
    
            await factory(User)({
                identity: IdentityEnum.TOURIST,
                org: org6,
                area: sample(area)
            }).seedMany(10);
    
            await factory(User)({
                identity: IdentityEnum.FINANCER,
                org: org7,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(5);
    
            await factory(User)({
                identity: IdentityEnum.INVESTOR,
                org: org8,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(5);
    
            await factory(User)({
                identity: IdentityEnum.PROVIDER,
                org: org9,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(10);
        }


    }
}
