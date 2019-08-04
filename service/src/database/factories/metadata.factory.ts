import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Metadata } from "../entities";

interface IMetadataSetting {
    title: string;
    sort?: number;
    parent?: Metadata;
    children?: Metadata[];
}

define(Metadata, (faker: typeof Faker, settings: IMetadataSetting) => {
    const target = new Metadata();
    target.title = settings.title;
    target.sort = settings.sort || 0;
    target.parent = settings.parent;
    target.children = settings.children;

    return target;
})