import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { IdentityEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../../core';
import { Metadata, Org, User } from '../entities';

define(User, (
  faker: typeof Faker,
  settings: {
    status: UserStatusEnum;
    type: UserTypeEnum;
    identity: IdentityEnum;
    area: Metadata;
    org: Org;
    vip: UserLevelEnum;
  },
) => {
  const user = new User();
  user.account = faker.internet.userName();
  user.avatar = faker.image.avatar();
  user.realname = faker.name.findName();
  user.phone = faker.phone.phoneNumber();
  user.address = `${faker.address.country()}${faker.address.city()}${faker.address.streetAddress()}`;
  user.profile = faker.lorem.sentence();
  user.company = faker.company.companyName();
  user.identity = settings.identity || IdentityEnum.TOURIST;
  user.status = settings.status || UserStatusEnum.CHECKED;
  user.type = settings.type || UserTypeEnum.PERSONAL;
  user.area = settings.area;
  user.org = settings.org;
  user.vip = settings.vip || UserLevelEnum.V0;

  if (
    settings.identity != IdentityEnum.TOURIST &&
    settings.identity != IdentityEnum.USER
  ) {
    user.status = faker.random.number({ min: 0, max: 4 });
  }

  return user;
});
