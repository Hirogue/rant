import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
// import { BasePaginatedArgs } from "../dtos";

export abstract class BaseService<T> extends TypeOrmCrudService<T> {
    // createPaginated(items: T[], total: number, args: BasePaginatedArgs) {

    //     const totalPage = Math.ceil(total / args.pageSize);
    //     const hasMore = totalPage > args.page;

    //     return { items, total, page: args.page, totalPage, hasMore };
    // }
}