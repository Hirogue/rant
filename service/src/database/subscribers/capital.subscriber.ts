import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Capital } from "../entities";

@EventSubscriber()
export class CapitalSubscriber implements EntitySubscriberInterface<Capital> {

    listenTo() {
        return Capital;
    }

    beforeInsert(event: InsertEvent<Capital>) {
        this.handleChange(event.entity);
    }

    beforeUpdate(event: UpdateEvent<Capital>) {
        this.handleChange(event.entity);
    }

    private handleChange(entity: Capital) {
        if (!!entity) {
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