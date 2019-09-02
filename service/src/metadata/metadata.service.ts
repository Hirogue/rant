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
}
