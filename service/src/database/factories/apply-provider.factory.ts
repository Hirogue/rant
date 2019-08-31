import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ApplyProvider, User, Provider } from '../entities';


interface IApplyProviderSetting {
    applicant: User;
    prodiver: Provider;
}

define(ApplyProvider, (faker: typeof Faker, settings: IApplyProviderSetting) => {
    const instance = new ApplyProvider();
    instance.applicant = settings.applicant;
    instance.provider = settings.prodiver;


    return instance;
})