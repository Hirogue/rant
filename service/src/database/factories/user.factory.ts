import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Identity } from '../../common/core/enums';
import { User } from "../entities";

define(User, (faker: typeof Faker, settings: { identity: Identity }) => {
    const user = new User();
    user.account = faker.internet.email();
    user.avatar = faker.image.avatar();
    user.realname = faker.name.findName();
    user.phone = faker.phone.phoneNumber();
    user.address = `${faker.address.country()}${faker.address.city()}${faker.address.streetAddress()}`;
    user.profile = faker.lorem.sentence();
    user.company = faker.company.companyName();
    user.identity = settings.identity || Identity.TOURIST;

    return user;
})