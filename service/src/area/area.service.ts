import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Area } from '../database/entities';

@Injectable()
export class AreaService extends BaseTreeService<Area> {
    constructor(@InjectRepository(Area) protected readonly repo: TreeRepository<Area>) {
        super(repo);
    }
}
