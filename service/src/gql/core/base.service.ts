import { BasePaginatedArgs } from "./base-paginated.args";

export abstract class BaseService<T> {
    createPaginated(items: T[], total: number, args: BasePaginatedArgs) {

        const totalPage = Math.ceil(total / args.pageSize);
        const hasMore = totalPage > args.page;

        return { items, total, page: args.page, totalPage, hasMore };
    }
}