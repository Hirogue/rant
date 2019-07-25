import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../database';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { ProductPaginated } from './product-paginated.type';
import { ProductService } from './product.service';
import { ProductPaginatedArgs } from './product-paginated.args';



@Resolver(of => Product)
@UseGuards(GqlJwtAuthGuard)
export class ProductResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Query(returns => ProductPaginated)
    async products(@Args() args: ProductPaginatedArgs) {
        return await this.productService.query(args);
    }

}