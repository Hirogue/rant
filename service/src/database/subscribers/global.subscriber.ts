import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class GlobalSubscriber implements EntitySubscriberInterface<any> {

    beforeInsert(event: InsertEvent<any>) {

    }

    beforeUpdate(event: UpdateEvent<any>) {

    }
}