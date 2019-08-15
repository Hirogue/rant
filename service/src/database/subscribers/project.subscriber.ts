import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Project } from "../entities";

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {

    listenTo() {
        return Project;
    }

    beforeInsert(event: InsertEvent<Project>) {
        event.entity.summary = textInterception(event.entity.info, 40);
    }

    beforeUpdate(event: UpdateEvent<Project>) {
        event.entity.summary = textInterception(event.entity.info, 40);
    }
}