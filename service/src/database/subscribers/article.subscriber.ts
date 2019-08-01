import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { extractionTextInHtml, textInterception } from "../../core";
import { Article } from "../entities";

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {

    listenTo() {
        return Article;
    }

    beforeInsert(event: InsertEvent<Article>) {
        event.entity.summary = textInterception(extractionTextInHtml(event.entity.text), 40);
    }

    beforeUpdate(event: UpdateEvent<Article>) {
        const text = extractionTextInHtml(event.entity.text);
        event.entity.summary = textInterception(extractionTextInHtml(event.entity.text), 40);
    }
}