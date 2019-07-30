import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Org } from "../entities";

interface IOrgSetting {
    title: string;
    sort?: number;
    parent?: Org;
    children?: Org[];
}

define(Org, (faker: typeof Faker, settings: IOrgSetting) => {
    const org = new Org();
    org.title = settings.title;
    org.sort = settings.sort || 0;
    org.parent = settings.parent;
    org.children = settings.children;

    return org;
})