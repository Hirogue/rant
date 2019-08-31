import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ApplyProduct, User, Product } from '../entities';


interface IApplyProductSetting {
    applicant: User;
    product: Product;
}

define(ApplyProduct, (faker: typeof Faker, settings: IApplyProductSetting) => {
    const instance = new ApplyProduct();
    instance.applicant = settings.applicant;
    instance.product = settings.product;


    return instance;
})