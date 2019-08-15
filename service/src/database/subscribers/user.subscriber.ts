import * as R from 'ramda';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { UserLevelEnum } from "../../core";
import { User } from "../entities";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        this.handleChange(event.entity);
    }

    beforeUpdate(event: UpdateEvent<User>) {
        this.handleChange(event.entity);

        // const rules = R.cond([

        //     [
        //         () => R.lt(1, UserLevelEnum.V1),
        //         R.always('用户等级不足')
        //     ],

        //     [
        //         () => R.lt(1, UserLevelEnum.V1),
        //         R.always('用户等级不足')
        //     ],

        //     [
        //         R.anyPass([

        //         ]),
        //         R.always('water freezes at 0°C')
        //     ],

        //     [R.T, target => '']
        // ]);

        // rules(event.entity);
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