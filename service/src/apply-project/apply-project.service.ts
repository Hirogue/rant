import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { ApplyProject } from '../database';

@Injectable()
export class ApplyProjectService extends BaseService<ApplyProject> {
    constructor(@InjectRepository(ApplyProject) protected readonly repo: Repository<ApplyProject>) {
        super(repo);
    }
}
