import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Seo } from '../entities';
import moment = require('moment');

interface ISeoSetting {
    title?: string;
    path?: string;
    keywords?: string;
    description?: string;
}

define(Seo, (faker: typeof Faker, settings: ISeoSetting) => {
    const instance = new Seo();
    instance.title = settings.title || '';
    instance.path = settings.path || '';
    instance.keywords = settings.keywords || '';
    instance.description = settings.description || '';

    return instance;
})