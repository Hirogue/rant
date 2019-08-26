import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Authority } from '../database';

@Injectable()
export class AuthorityService extends BaseTreeService<Authority> {
    constructor(@InjectRepository(Authority) protected readonly repo: TreeRepository<Authority>) {
        super(repo);
    }
}
