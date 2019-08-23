import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Document } from '../database';

@Injectable()
export class DocumentService extends BaseService<Document> {
    constructor(@InjectRepository(Document) protected readonly repo: Repository<Document>) {
        super(repo);
    }
}
