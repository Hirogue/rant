import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository, Db } from "typeorm";
import { Product } from "../../database";
import { ProductPaginatedArgs } from "./product-paginated.args";
import { BaseService } from "../core/base.service";

@Injectable()
export class ProductService extends BaseService<Product> {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {
        super();
    }

    async query(args: ProductPaginatedArgs) {
        const qb = this.productRepository.createQueryBuilder('t');

        qb.leftJoinAndSelect('t.category', 'category');

        if (!args.page || args.page < 1) {
            args.page = 1;
        }

        if (!args.pageSize) {
            args.pageSize = 5;
        }


        if (args.keyword) {
            qb.andWhere(new Brackets(qb => {
                qb.where(`t.account LIKE '%${args.keyword}%'`)
                    .orWhere(`t.realName LIKE '%${args.keyword}%'`)
                    .orWhere(`t.phone LIKE '%${args.keyword}%'`)
                    .orWhere(`t.company LIKE '%${args.keyword}%'`)
            }));
        }

        // args.order = args.order || 'DESC';

        // if (!!args.sort) {
        //     qb.addOrderBy(`t.${args.sort}`, args.order);
        // } else {
        //     qb.addOrderBy('t.update_at', args.order);
        // }

        qb.skip((args.page - 1) * args.pageSize);
        qb.take(args.pageSize);

        const [items, total] = await qb.getManyAndCount();

        return this.createPaginated(items, total, args);
    }

}