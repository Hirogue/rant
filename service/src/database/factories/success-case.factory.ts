import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { SuccessCase } from '../entities';
import moment = require('moment');

interface ISuccesscaseSetting {
    title?: string;
    cover?: string;
    is_published?: boolean;
    summary?: string;
    publish_at?: string;
    sort?: number;
}

define(SuccessCase, (faker: typeof Faker, settings: ISuccesscaseSetting) => {
    const instance = new SuccessCase();
    instance.title = settings.title || faker.lorem.sentences();
    instance.cover = settings.cover || '';
    instance.summary = settings.summary || '';
    instance.sort = settings.sort || 0;
    instance.publish_at = settings.publish_at || moment().format('YYYY-MM-DD HH:mm:ss');
    instance.is_published = settings.is_published || false;

    return instance;
})