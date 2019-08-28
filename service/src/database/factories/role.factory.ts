import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Role } from "../entities";


define(Role, (faker: typeof Faker, settings: any) => {

    const target = new Role();

    target.name = settings.name;
    target.sort = settings.sort || 0;
    target.grants = settings.grants;

    return target;
})