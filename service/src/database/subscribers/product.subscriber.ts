import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Product } from "../entities";

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {

    listenTo() {
        return Product;
    }

    beforeInsert(event: InsertEvent<Product>) {
        this.handleChange(event.entity);
    }

    beforeUpdate(event: UpdateEvent<Product>) {
        this.handleChange(event.entity);
    }

    private handleChange(entity: Product) {
        if (entity) {
            entity.summary = entity.introduction ? textInterception(entity.introduction, 40) : '';
        }
    }
}