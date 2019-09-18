import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Role, User } from "../entities";
import { BaseSubscriber } from "./base.subscriber";

@EventSubscriber()
export class UserSubscriber extends BaseSubscriber<User> implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {

        if (!event.entity.role) {
            const defaultRole = await event.connection.getRepository(Role).findOne({ name: '默认' });
            event.entity.role = defaultRole;
        }

        await this.handleChange(event.entity, event.manager);
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        await this.handleChange(event.entity, event.manager);
    }

    private async handleChange(entity: User, manager: EntityManager) {
        if (!!entity) {

            if (entity.area) {
                entity.area_path = await this.recordFullAreaPath(entity.area, manager);
            }

            entity.hideName = entity.realname
                ? entity.realname.substr(0, 1).padEnd(entity.realname.length, '*')
                : '';

            entity.hidePhone = entity.phone
                ? entity.phone.replace(entity.phone.substring(3, 7), '****')
                : '';

            entity.hideCompany = entity.company
                ? '**' + entity.company
                    .substr(entity.company.length - 2, entity.company.length)
                : '';
        }
    }
}