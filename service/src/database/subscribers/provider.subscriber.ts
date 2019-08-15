import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Provider } from "../entities";

@EventSubscriber()
export class ProviderSubscriber implements EntitySubscriberInterface<Provider> {

    listenTo() {
        return Provider;
    }

    beforeInsert(event: InsertEvent<Provider>) {
        event.entity.summary = textInterception(event.entity.introduction, 40);
    }

    beforeUpdate(event: UpdateEvent<Provider>) {
        event.entity.summary = textInterception(event.entity.introduction, 40);
    }
}