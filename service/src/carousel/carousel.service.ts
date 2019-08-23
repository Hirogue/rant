import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Carousel } from '../database';

@Injectable()
export class CarouselService extends BaseService<Carousel> {
    constructor(@InjectRepository(Carousel) protected readonly repo: Repository<Carousel>) {
        super(repo);
    }
}
