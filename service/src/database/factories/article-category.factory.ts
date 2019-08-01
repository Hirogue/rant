import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ArticleCategory } from '../entities';

interface IArticleCategorySetting {
    title: string;
    sort?: number;
    parent?: ArticleCategory;
    children?: ArticleCategory[];
}

define(ArticleCategory, (faker: typeof Faker, settings: IArticleCategorySetting) => {
    const instance = new ArticleCategory();
    instance.title = settings.title;
    instance.sort = settings.sort || 0;
    instance.parent = settings.parent;
    instance.children = settings.children;

    return instance;
})