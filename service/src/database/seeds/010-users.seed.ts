import * as csv from 'csvtojson';
import * as Faker from 'faker';
import { existsSync } from "fs";
import { sample } from "lodash";
import { join } from "path";
import { Connection, Like } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum, UserStatusEnum, UserTypeEnum } from "../../core";
import { Metadata, User } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

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
        superAdmin.isSuperAdmin = true;

        await connection.getRepository(User).save(superAdmin);

        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_users.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);

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

                const area = await connection.getRepository(Metadata).findOne({ where: { title: Like(`${item.area}%`), } });
                user.area = area;

                if (item.id_name == "游客") {
                    user.identity = IdentityEnum.TOURIST;
                } else if (item.id_name == "项目方") {
                    user.identity = IdentityEnum.FINANCER;
                } else if (item.id_name == "资金方") {
                    user.identity = IdentityEnum.INVESTOR;
                } else if (item.id_name == "服务商") {
                    user.identity = IdentityEnum.PROVIDER;
                } else {
                    user.identity = IdentityEnum.USER;
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
                area: sample(area)
            }).seedMany(4);

            await factory(User)({
                identity: IdentityEnum.USER,
                area: sample(area)
            }).seedMany(4);

            await factory(User)({
                identity: IdentityEnum.USER,
                area: sample(area)
            }).seedMany(5);

            await factory(User)({
                identity: IdentityEnum.USER,
                area: sample(area)
            }).seedMany(2);

            await factory(User)({
                identity: IdentityEnum.TOURIST,
                area: sample(area)
            }).seedMany(10);

            await factory(User)({
                identity: IdentityEnum.FINANCER,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(5);

            await factory(User)({
                identity: IdentityEnum.INVESTOR,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(5);

            await factory(User)({
                identity: IdentityEnum.PROVIDER,
                area: sample(area),
                type: UserTypeEnum[sample(typeList)],
                status: UserStatusEnum[sample(status)],
            }).seedMany(10);
        }


    }
}
