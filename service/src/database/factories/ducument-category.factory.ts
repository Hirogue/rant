import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { DocumentCategory, Document } from '../entities';

interface IDocumentCategorySetting {
    title: string;
    sort?: number;
    parent?: DocumentCategory;
    children?: DocumentCategory[];
    docs?: Document[];
}

define(DocumentCategory, (faker: typeof Faker, settings: IDocumentCategorySetting) => {
    const instance = new DocumentCategory();
    instance.title = settings.title;
    instance.sort = settings.sort || 0;
    instance.parent = settings.parent;
    instance.children = settings.children;
    instance.docs = settings.docs;

    return instance;
})