import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Role } from '../database';

@Injectable()
export class RoleService extends BaseService<Role> {
    constructor(@InjectRepository(Role) protected readonly repo: Repository<Role>) {
        super(repo);
    }
}
