import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Role, User } from "../entities";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {

        if (!event.entity.role) {
            const defaultRole = await event.connection.getRepository(Role).findOne({ name: '默认' });
            event.entity.role = defaultRole;
        }

        this.handleChange(event.entity);
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        this.handleChange(event.entity);
    }

    private handleChange(entity: User) {
        entity.hideName = entity.realname
            ? entity.realname.substr(0, 1).padEnd(entity.realname.length, '*')
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