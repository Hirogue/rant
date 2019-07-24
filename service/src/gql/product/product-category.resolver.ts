import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from '../../database';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { ProductCategoryService } from './product-category.service';

@Resolver(of => ProductCategory)
@UseGuards(GqlJwtAuthGuard)
export class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService
    ) { }

    @Query(returns => [ProductCategory])
    async productCategories() {
        return await this.productCategoryService.findCategories();
    }
}