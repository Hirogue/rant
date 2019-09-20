import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Customer } from "../entities";
import { BaseSubscriber } from "./base.subscriber";

@EventSubscriber()
export class CustomerSubscriber extends BaseSubscriber<Customer> implements EntitySubscriberInterface<Customer> {

    listenTo() {
        return Customer;
    }

    async beforeInsert(event: InsertEvent<Customer>) {

        await this.handleChange(event.entity, event.manager);
    }

    async beforeUpdate(event: UpdateEvent<Customer>) {
        await this.handleChange(event.entity, event.manager);
    }

    private async handleChange(entity: Customer, manager: EntityManager) {
        if (!!entity) {

            if (entity.area) {
                entity.area_path = await this.recordFullAreaPath(entity.area, manager);
            }
        }
    }
}