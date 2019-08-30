import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Log } from '../database';

@Injectable()
export class LogService extends BaseService<Log> {
    constructor(@InjectRepository(Log) protected readonly repo: Repository<Log>) {
        super(repo);
    }
}
