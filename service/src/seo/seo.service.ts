import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Seo } from '../database';

@Injectable()
export class SeoService extends BaseService<Seo> {
    constructor(@InjectRepository(Seo) protected readonly repo: Repository<Seo>) {
        super(repo);
    }
}
