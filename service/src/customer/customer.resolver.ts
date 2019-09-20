import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth';
import { BasePaginate, BaseResolver } from '../core';
import { Customer } from '../database';
import { CustomerService } from './customer.service';

@ObjectType()
export class CustomerPaginate extends BasePaginate(Customer) { }

@Resolver(of => Customer)
export class CustomerResolver extends BaseResolver(Customer, CustomerPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly customerService: CustomerService
    ) {
        super(context, 'customer');
    }

    @Mutation(returns => Boolean, { description: 'Approval customer' })
    @UseGuards(GqlJwtAuthGuard)
    async approvalCustomer(@Args('data') data: Customer) {
        return await this.customerService.approval(data);
    }
}