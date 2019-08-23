import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Carousel } from '../database';

@ObjectType()
export class CarouselPaginate extends BasePaginate(Carousel) { }

@Resolver(of => Carousel)
export class CarouselResolver extends BaseResolver(Carousel, CarouselPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'carousel'); }
}