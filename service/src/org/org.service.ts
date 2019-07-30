import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Org } from '../database/entities';

@Injectable()
export class OrgService extends BaseTreeService<Org> {
    constructor(@InjectRepository(Org) repo: TreeRepository<Org>) {
        super(repo);
    }
}
