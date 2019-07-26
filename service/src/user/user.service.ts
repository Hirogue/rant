import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../core';
import { User } from '../database/entities';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectRepository(User) repo) {
        super(repo);
    }
}
