import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Project } from '../database/entities';

@Injectable()
export class ProjectService extends BaseService<Project> {
    constructor(@InjectRepository(Project) protected readonly repo: Repository<Project>) {
        super(repo);
    }
}
