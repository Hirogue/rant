import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Article, ArticleCategory } from '../entities';
import moment = require('moment');

interface IArticleSetting {
    title?: string;
    cover?: string;
    author?: string;
    source?: string;
    text?: string;
    summary?: string;
    sort?: number;
    category: ArticleCategory;
    publish_at?: string;
}

define(Article, (faker: typeof Faker, settings: IArticleSetting) => {
    const instance = new Article();
    instance.title = settings.title || faker.lorem.sentences();
    instance.cover = settings.cover || faker.image.imageUrl(441.6, 270);
    instance.author = settings.author || faker.name.findName();
    instance.source = settings.source || faker.company.companyName();
    instance.summary = settings.summary || faker.lorem.paragraphs();
    instance.text = settings.text || faker.lorem.text();
    instance.sort = settings.sort || 0;
    instance.is_top = false;
    instance.is_published = true;
    instance.category = settings.category;
    instance.publish_at = settings.publish_at || moment().format('YYYY-MM-DD HH:mm:ss');

    return instance;
})