import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { CapitalType } from '../database/entities';

@Injectable()
export class CapitalTypeService extends BaseTreeService<CapitalType> {
    constructor(@InjectRepository(CapitalType) protected readonly repo: TreeRepository<CapitalType>) {
        super(repo);
    }
}
