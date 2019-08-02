import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { ProviderCategory } from '../database/entities';

@Injectable()
export class ProviderCategoryService extends BaseTreeService<ProviderCategory> {
    constructor(@InjectRepository(ProviderCategory) protected readonly repo: TreeRepository<ProviderCategory>) {
        super(repo);
    }
}
