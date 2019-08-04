import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { CapitalType } from "../entities";

interface ICapitalTypeSetting {
    title: string;
    sort?: number;
    parent?: CapitalType;
    children?: CapitalType[];
}

define(CapitalType, (faker: typeof Faker, settings: ICapitalTypeSetting) => {
    const target = new CapitalType();
    target.title = settings.title;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})