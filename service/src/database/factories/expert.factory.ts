import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Expert } from '../entities';
import moment = require('moment');

interface IExpertSetting {
    name?: string;
    avatar?: string;
    category?: string;
    company?: string;
    position?: string;
    info?: string;
    is_published?: boolean;
    sort?: number;
}

define(Expert, (faker: typeof Faker, settings: IExpertSetting) => {
    const instance = new Expert();
    instance.name = settings.name || '';
    instance.avatar = settings.avatar || '';
    instance.category = settings.category || '';
    instance.company = settings.company || '';
    instance.position = settings.position || '';
    instance.info = settings.info || '';
    instance.is_published = settings.is_published || false;
    instance.sort = settings.sort || 0;

    return instance;
})