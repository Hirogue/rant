import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from '../../database';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { ProductService } from './product.service';

@Resolver(of => ProductCategory)
@UseGuards(GqlJwtAuthGuard)
export class ProductCategoryResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Query(returns => [ProductCategory])
    async productCategories() {
        return await this.productService.findCategories();
    }
}