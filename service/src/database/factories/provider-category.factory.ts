import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ProviderCategory } from '../entities';

interface IProviderCategorySetting {
    title: string;
    sort?: number;
    parent?: ProviderCategory;
    children?: ProviderCategory[];
}

define(ProviderCategory, (faker: typeof Faker, settings: IProviderCategorySetting) => {
    const instance = new ProviderCategory();
    instance.title = settings.title;
    instance.sort = settings.sort || 0;
    instance.parent = settings.parent;
    instance.children = settings.children;

    return instance;
})