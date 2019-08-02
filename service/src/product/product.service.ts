import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Product } from '../database/entities';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(@InjectRepository(Product) protected readonly repo: Repository<Product>) {
        super(repo);
    }
}
