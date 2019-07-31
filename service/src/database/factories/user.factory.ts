import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { IdentityEnum } from '../../core';
import { User, Org } from "../entities";

define(User, (faker: typeof Faker, settings: { identity: IdentityEnum, org: Org }) => {
    const user = new User();
    user.account = faker.internet.userName();
    user.avatar = faker.image.avatar();
    user.realname = faker.name.findName();
    user.phone = faker.phone.phoneNumber();
    user.address = `${faker.address.country()}${faker.address.city()}${faker.address.streetAddress()}`;
    user.profile = faker.lorem.sentence();
    user.company = faker.company.companyName();
    user.identity = settings.identity || IdentityEnum.TOURIST;
    user.org = settings.org;

    if (settings.identity != IdentityEnum.TOURIST && settings.identity != IdentityEnum.USER) {
        user.status = faker.random.number({ min: 0, max: 4 });
    }

    return user;
})