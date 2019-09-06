import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { ApplyCapital } from '../database';

@Injectable()
export class ApplyCapitalService extends BaseService<ApplyCapital> {
    constructor(@InjectRepository(ApplyCapital) protected readonly repo: Repository<ApplyCapital>) {
        super(repo);
    }
}
