import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { User } from "../entities";
import { Logger } from "../../logger";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        this.handleChange(event.entity);
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        this.handleChange(event.entity);

        const newEntity = event.entity;

        const oldEntity = await event.manager.getRepository(User).findOne({
            where: { id: newEntity.id },
            relations: ['org', 'apply_capitals']
        });

        Logger.debug('user new entity:', newEntity);
        Logger.debug('user old entity:', oldEntity);

        if (newEntity.apply_capitals) {

            newEntity.apply_capitals = oldEntity.apply_capitals.concat(newEntity.apply_capitals);

        }

        Logger.debug('user final entity:', newEntity);
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