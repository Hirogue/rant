import { EntityManager } from "typeorm";
import { Metadata } from "../entities";

export abstract class BaseSubscriber<T> {
    async recordFullAreaPath(area: Metadata, manager: EntityManager) {

        const ancestors = await manager.getTreeRepository(Metadata).findAncestors(area);

        return ancestors.map(item => item.id).join('.');
    }
}