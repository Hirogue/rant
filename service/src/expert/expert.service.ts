import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Expert } from '../database';

@Injectable()
export class ExpertService extends BaseService<Expert> {
    constructor(@InjectRepository(Expert) protected readonly repo: Repository<Expert>) {
        super(repo);
    }
}
