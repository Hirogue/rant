import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Provider } from "../entities";

@EventSubscriber()
export class ProviderSubscriber implements EntitySubscriberInterface<Provider> {

    listenTo() {
        return Provider;
    }

    beforeInsert(event: InsertEvent<Provider>) {
        this.handleChange(event.entity);
    }

    beforeUpdate(event: UpdateEvent<Provider>) {
        this.handleChange(event.entity);
    }

    private handleChange(entity: Provider) {
        if (entity) {
            entity.summary = entity.introduction ? textInterception(entity.introduction, 40) : '';
        }
    }
}