import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Area } from "../entities";

interface IAreaSetting {
    title: string;
    sort?: number;
    parent?: Area;
    children?: Area[];
}

define(Area, (faker: typeof Faker, settings: IAreaSetting) => {
    const target = new Area();
    target.title = settings.title;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})