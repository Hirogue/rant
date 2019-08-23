import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { DocumentCategory } from '../database';

@Injectable()
export class DocumentCategoryService extends BaseTreeService<DocumentCategory> {
    constructor(@InjectRepository(DocumentCategory) protected readonly repo: TreeRepository<DocumentCategory>) {
        super(repo);
    }
}
