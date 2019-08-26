import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Carousel } from '../entities';

interface ICarouselSetting {
    title?: string;
    url?: string;
    link?: string;
    is_published?: boolean;
    sort?: number;
}

define(Carousel, (faker: typeof Faker, settings: ICarouselSetting) => {
    const instance = new Carousel();
    instance.title = settings.title || faker.lorem.sentences();
    instance.url = settings.url || '';
    instance.sort = settings.sort || 0;
    instance.link = settings.link || '';
    instance.is_published = settings.is_published || false;

    return instance;
})