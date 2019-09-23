import { EntityManager } from 'typeorm';
import { Metadata } from '../entities';

export abstract class BaseSubscriber<T> {
  async recordFullAreaPath(area: Metadata, manager: EntityManager) {
    const ancestors = await manager
      .getTreeRepository(Metadata)
      .findAncestors(area);
    ancestors.shift();

    return ancestors.map(item => item.title).join(' ');
  }
}
