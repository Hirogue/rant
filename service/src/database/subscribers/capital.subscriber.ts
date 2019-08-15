import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Capital } from "../entities";

@EventSubscriber()
export class CapitalSubscriber implements EntitySubscriberInterface<Capital> {

    listenTo() {
        return Capital;
    }

    beforeInsert(event: InsertEvent<Capital>) {
        event.entity.summary = textInterception(event.entity.info, 40);
    }

    beforeUpdate(event: UpdateEvent<Capital>) {
        event.entity.summary = textInterception(event.entity.info, 40);
    }
}