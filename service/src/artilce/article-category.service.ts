import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BaseTreeService } from '../core';
import { ArticleCategory } from '../database/entities';

@Injectable()
export class ArticleCategoryService extends BaseTreeService<ArticleCategory> {
  constructor(
    @InjectRepository(ArticleCategory)
    protected readonly repo: TreeRepository<ArticleCategory>,
  ) {
    super(repo);
  }
}
