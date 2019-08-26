import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { Document, DocumentCategory } from '../entities';
import moment = require('moment');

interface IDocumentSetting {
    title?: string;
    author?: string;
    source?: string;
    cover?: string;
    views?: number;
    is_top?: boolean;
    summary?: string;
    text?: string;
    category?: DocumentCategory;
    is_published?: boolean;
    publish_at?: string;
    sort?: number;
}

define(Document, (faker: typeof Faker, settings: IDocumentSetting) => {
    const instance = new Document();
    instance.title = settings.title || '';
    instance.cover = settings.cover || '';
    instance.category = settings.category;
    instance.author = settings.author || '';
    instance.summary = settings.summary || '';
    instance.text = settings.text || '';
    instance.is_top = settings.is_top || false;
    instance.source = settings.source || '';
    instance.views = settings.views || 0;

    instance.is_published = settings.is_published || false;
    instance.sort = settings.sort || 0;

    return instance;
})