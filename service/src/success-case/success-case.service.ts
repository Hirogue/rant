import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { SuccessCase } from '../database/entities';

@Injectable()
export class SuccessCaseService extends BaseService<SuccessCase> {
    constructor(@InjectRepository(SuccessCase) protected readonly repo: Repository<SuccessCase>) {
        super(repo);
    }
}
