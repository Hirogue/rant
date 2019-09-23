import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessControlService } from '../access-control';
import { BaseService } from '../core';
import { Role } from '../database';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    private readonly ac: AccessControlService,
    @InjectRepository(Role)
    protected readonly repo: Repository<Role>,
  ) {
    super(repo);
  }

  async findAll() {
    return await this.repo.find();
  }

  async updateGrants(id: string, grants: any) {
    await this.repo.update(id, { grants });
    await this.ac.loadGrants();

    return true;
  }
}
