import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { ApplyProvider } from '../database';

@Injectable()
export class ApplyProviderService extends BaseService<ApplyProvider> {
    constructor(@InjectRepository(ApplyProvider) protected readonly repo: Repository<ApplyProvider>) {
        super(repo);
    }
}
