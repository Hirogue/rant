import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Log } from '../database';

@ObjectType()
export class LogPaginate extends BasePaginate(Log) { }

@Resolver(of => Log)
export class LogResolver extends BaseResolver(Log, LogPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'log'); }
}