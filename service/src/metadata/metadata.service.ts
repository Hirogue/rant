import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Metadata } from '../database';

@Injectable()
export class MetadataService extends BaseTreeService<Metadata> {
    constructor(@InjectRepository(Metadata) protected readonly repo: TreeRepository<Metadata>) {
        super(repo);
    }

    async findRootsAndChildren() {

        const roots = await this.repository.findRoots();

        return await this.repo.createQueryBuilder('t')
            .leftJoinAndSelect('t.children', 'children')
            .whereInIds(roots.map(root => root.id))
            .getMany();
    }

    async findChildrenByTitle(title: string) {

        const result = await this.repo.createQueryBuilder('t')
            .leftJoinAndSelect('t.children', 'children')
            .where('t.title = :title', { title })
            .getOne();

        return result ? result.children : [];
    }

    async findChildrenById(id: string) {

        const result = await this.repo.createQueryBuilder('t')
            .leftJoinAndSelect('t.children', 'children')
            .where('t.id = :id', { id })
            .getOne();

        return result ? result.children : [];
    }
}
