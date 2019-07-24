import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Product, ProductCategory } from "../entities";

interface IProductSetting {
    name?: string;
    slug?: string;
    sort?: number;
    cover?: string;
    image?: string;
    introduce?: string;
    features?: string;
    flows?: any;
    category: ProductCategory;
}

define(Product, (faker: typeof Faker, settings: IProductSetting) => {
    const product = new Product();
    product.name = settings.name || faker.commerce.productName();
    product.slug = settings.slug || faker.commerce.productAdjective();
    product.sort = settings.sort || 0;
    product.cover = settings.cover || faker.image.business(372, 232);
    product.image = settings.image || faker.image.business(741.64, 408.84);
    product.introduce = settings.introduce || faker.commerce.product();
    product.features = settings.features || faker.commerce.productMaterial();
    product.flows = settings.flows || [{ sort: 1, value: '第一步' }, { sort: 2, value: '第二步' }];
    product.category = settings.category;

    return product;
})