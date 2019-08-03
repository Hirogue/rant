import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Industry } from '../database/entities';

@Injectable()
export class IndustryService extends BaseTreeService<Industry> {
    constructor(@InjectRepository(Industry) protected readonly repo: TreeRepository<Industry>) {
        super(repo);
    }
}
