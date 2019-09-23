import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { Org } from '../database';

@Injectable()
export class OrgService extends BaseTreeService<Org> {
  constructor(
    @InjectRepository(Org) protected readonly repo: TreeRepository<Org>,
  ) {
    super(repo);
  }
}
