import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Amount } from '../database/entities';

@Injectable()
export class AmountService extends BaseTreeService<Amount> {
    constructor(@InjectRepository(Amount) protected readonly repo: TreeRepository<Amount>) {
        super(repo);
    }
}
