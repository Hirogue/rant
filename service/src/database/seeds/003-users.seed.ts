import { Connection } from "typeorm";
import * as Faker from 'faker';
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum } from "../../common/core/enums";
import { User } from "../entities";

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const superAdmin = new User();
        superAdmin.account = 'SuperAdmin';
        superAdmin.identity = IdentityEnum.USER;
        superAdmin.avatar = Faker.image.avatar();
        superAdmin.realname = 'Super Admin';
        superAdmin.profile = 'A mysterious person with arbitrary authority!';

        await connection.getRepository(User).save(superAdmin);

        await factory(User)({ identity: IdentityEnum.TOURIST }).seedMany(10);
        await factory(User)({ identity: IdentityEnum.USER }).seedMany(10);
        await factory(User)({ identity: IdentityEnum.FINANCER }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.INVESTOR }).seedMany(5);
        await factory(User)({ identity: IdentityEnum.PROVIDER }).seedMany(3);

    }
}
