import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Product, ProductCategory } from '../entities';

interface IProductSetting {
    name?: string;
    slogan?: string;
    cover?: string;
    flowsheet?: string;
    flows?: any;
    introduction?: string;
    advantage?: string;
    category: ProductCategory;
}

define(Product, (faker: typeof Faker, settings: IProductSetting) => {
    const instance = new Product();
    instance.name = settings.name || faker.commerce.productName();
    instance.slogan = settings.slogan || faker.lorem.sentence();
    instance.cover = settings.cover || faker.image.imageUrl(372, 232);
    instance.flowsheet = settings.flowsheet || faker.image.imageUrl(741.64, 408.84);
    instance.flows = settings.flows;
    instance.introduction = settings.introduction || faker.lorem.text();
    instance.advantage = settings.advantage || faker.lorem.text();
    instance.category = settings.category;

    return instance;
})