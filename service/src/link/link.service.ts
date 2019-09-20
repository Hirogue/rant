import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Link } from '../database';

@Injectable()
export class LinkService extends BaseService<Link> {
    constructor(@InjectRepository(Link) protected readonly repo: Repository<Link>) {
        super(repo);
    }
}
