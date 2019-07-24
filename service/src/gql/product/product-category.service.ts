import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TreeRepository } from "typeorm";
import { ProductCategory } from "../../database";
@Injectable()
export class ProductCategoryService {

    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: TreeRepository<ProductCategory>
    ) {

    }

    async findCategories() {
        return this.productCategoryRepository.findTrees();
    }
}