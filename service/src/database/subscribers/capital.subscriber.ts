import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Capital } from "../entities";
import { BaseSubscriber } from "./base.subscriber";

@EventSubscriber()
export class CapitalSubscriber extends BaseSubscriber<Capital> implements EntitySubscriberInterface<Capital> {

    listenTo() {
        return Capital;
    }

    async beforeInsert(event: InsertEvent<Capital>) {
        await this.handleChange(event.entity, event.manager);
    }

    async beforeUpdate(event: UpdateEvent<Capital>) {
        await this.handleChange(event.entity, event.manager);
    }


    private async handleChange(entity: Capital, manager: EntityManager) {
        if (!!entity) {

            if (entity.area) {
                entity.area_path = await this.recordFullAreaPath(entity.area, manager);
            }

            entity.summary = entity.info ? textInterception(entity.info, 40) : '';

            entity.hideContact = entity.contact
                ? entity.contact.substr(0, 1).padEnd(entity.contact.length, '*')
                : '';

            entity.hidePhone = entity.phone
                ? entity.phone.replace(entity.phone.substring(3, 7), '****')
                : '';

            entity.hideCompany = entity.company
                ? entity.company
                    .substr(entity.company.length - 2, entity.company.length)
                    .padStart(entity.company.length, '*')
                : '';
        }
    }
}