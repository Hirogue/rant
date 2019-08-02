import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ProductCategory } from '../entities/product-category.entity';

interface IProductCategorySetting {
    title: string;
    sort?: number;
    parent?: ProductCategory;
    children?: ProductCategory[];
}

define(ProductCategory, (faker: typeof Faker, settings: IProductCategorySetting) => {
    const instance = new ProductCategory();
    instance.title = settings.title;
    instance.sort = settings.sort || 0;
    instance.parent = settings.parent;
    instance.children = settings.children;

    return instance;
})