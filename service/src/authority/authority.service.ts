import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Authority } from '../database';

@Injectable()
export class AuthorityService extends BaseService<Authority> {
    constructor(@InjectRepository(Authority) protected readonly repo: Repository<Authority>) {
        super(repo);
    }
}
