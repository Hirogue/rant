import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { extractionTextInHtml, textInterception } from '../../core';
import { Article } from '../entities';

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
  listenTo() {
    return Article;
  }

  beforeInsert(event: InsertEvent<Article>) {
    this.handleChange(event.entity);
  }

  beforeUpdate(event: UpdateEvent<Article>) {
    this.handleChange(event.entity);
  }

  private handleChange(entity: Article) {
    if (entity && entity.text) {
      entity.summary = textInterception(extractionTextInHtml(entity.text), 40);
    }
  }
}
