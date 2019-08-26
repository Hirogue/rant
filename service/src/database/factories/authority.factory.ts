import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Authority } from "../entities";


define(Authority, (faker: typeof Faker, settings: { title: string, value: string }) => {

    const target = new Authority();
    target.title = settings.title;
    target.value = settings.value;

    return target;
})