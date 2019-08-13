import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Capital } from '../database/entities';

@Injectable()
export class CapitalService extends BaseService<Capital> {
    constructor(@InjectRepository(Capital) protected readonly repo: Repository<Capital>) {
        super(repo);
    }
}
