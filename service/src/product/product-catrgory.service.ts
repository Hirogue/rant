import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { ProductCategory } from '../database/entities';

@Injectable()
export class ProductCategoryService extends BaseTreeService<ProductCategory> {
    constructor(@InjectRepository(ProductCategory) protected readonly repo: TreeRepository<ProductCategory>) {
        super(repo);
    }
}
