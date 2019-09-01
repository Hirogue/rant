import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { textInterception } from "../../core";
import { Provider } from "../entities";
import { BaseSubscriber } from "./base.subscriber";

@EventSubscriber()
export class ProviderSubscriber extends BaseSubscriber<Provider> implements EntitySubscriberInterface<Provider> {

    listenTo() {
        return Provider;
    }

    async beforeInsert(event: InsertEvent<Provider>) {
        await this.handleChange(event.entity, event.manager);
    }

    async beforeUpdate(event: UpdateEvent<Provider>) {
        await this.handleChange(event.entity, event.manager);
    }

    private async handleChange(entity: Provider, manager: EntityManager) {
        if (entity) {
            if (entity.area) {
                entity.area_path = await this.recordFullAreaPath(entity.area, manager);
            }
            entity.summary = entity.introduction ? textInterception(entity.introduction, 40) : '';
        }
    }
}