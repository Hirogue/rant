import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Amount } from "../entities";

interface IAmountSetting {
    title: string;
    sort?: number;
    parent?: Amount;
    children?: Amount[];
}

define(Amount, (faker: typeof Faker, settings: IAmountSetting) => {
    const target = new Amount();
    target.title = settings.title;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})