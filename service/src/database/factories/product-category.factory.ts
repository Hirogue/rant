import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ProductCategory } from "../entities";

interface IProductCategorySetting {
    name: string;
    sort?: number;
    parent?: ProductCategory;
    children?: ProductCategory[];
}

define(ProductCategory, (faker: typeof Faker, settings: IProductCategorySetting) => {
    const category = new ProductCategory();
    category.name = settings.name;
    category.sort = settings.sort || 0;
    category.parent = settings.parent;
    category.children = settings.children;

    return category;
})