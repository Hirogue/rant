import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Article } from '../database/entities';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article) protected readonly repo: Repository<Article>,
  ) {
    super(repo);
  }
}
