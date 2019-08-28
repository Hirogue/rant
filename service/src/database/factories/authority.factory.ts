import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Authority } from "../entities";


define(Authority, (faker: typeof Faker, settings: any) => {

    const target = new Authority();

    target.name = settings.name;
    target.value = settings.value;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})