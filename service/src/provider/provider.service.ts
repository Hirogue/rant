import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Provider } from '../database/entities';

@Injectable()
export class ProviderService extends BaseService<Provider> {
    constructor(@InjectRepository(Provider) protected readonly repo: Repository<Provider>) {
        super(repo);
    }
}
