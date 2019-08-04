import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Metadata } from '../database';
import { BaseTreeService } from '../core';

@Injectable()
export class MetadataService extends BaseTreeService<Metadata> {
    constructor(@InjectRepository(Metadata) protected readonly repo: TreeRepository<Metadata>) {
        super(repo);
    }
}
