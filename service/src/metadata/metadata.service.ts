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

    async findChildrenByTitle(title: string) {

        return await this.repository.createQueryBuilder('t')
            .leftJoin('t.parent', 'p')
            .where(`p.title = :title`, { title })
            .getMany();
    }
}
