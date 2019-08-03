import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Industry } from "../entities";

interface IIndustrySetting {
    title: string;
    sort?: number;
    parent?: Industry;
    children?: Industry[];
}

define(Industry, (faker: typeof Faker, settings: IIndustrySetting) => {
    const target = new Industry();
    target.title = settings.title;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})