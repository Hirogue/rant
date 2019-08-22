import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Product } from "../entities";

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {

    listenTo() {
        return Product;
    }

    beforeInsert(event: InsertEvent<Product>) {
        event.entity.summary = event.entity.introduction ? textInterception(event.entity.introduction, 40) : '';
    }

    beforeUpdate(event: UpdateEvent<Product>) {
        event.entity.summary = event.entity.introduction ? textInterception(event.entity.introduction, 40) : '';
    }
}