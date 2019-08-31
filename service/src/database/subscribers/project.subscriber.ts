import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Project } from "../entities";

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {

    listenTo() {
        return Project;
    }

    beforeInsert(event: InsertEvent<Project>) {
        this.handleChange(event.entity);
    }

    beforeUpdate(event: UpdateEvent<Project>) {
        this.handleChange(event.entity);
    }

    private handleChange(entity: Project) {
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