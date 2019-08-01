import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Article, ArticleCategory } from '../entities';

interface IArticleSetting {
    title?: string;
    cover?: string;
    author?: string;
    source?: string;
    text?: string;
    summary?: string;
    sort?: number;
    category: ArticleCategory;
}

define(Article, (faker: typeof Faker, settings: IArticleSetting) => {
    const instance = new Article();
    instance.title = settings.title || faker.lorem.sentences();
    instance.cover = settings.cover || faker.image.imageUrl(441.6, 270);
    instance.author = settings.author || faker.name.findName();
    instance.source = settings.source || faker.company.companyName();
    instance.summary = settings.summary || faker.lorem.paragraphs();
    instance.text = settings.text || faker.lorem.text();
    instance.sort = settings.sort || faker.random.number({ min: 0, max: 100 });
    instance.is_top = !!faker.random.number({ min: 0, max: 1 });
    instance.is_published = !!faker.random.number({ min: 0, max: 1 });
    instance.category = settings.category;

    return instance;
})