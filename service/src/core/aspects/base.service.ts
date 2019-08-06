import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

// @ts-ignore left join only
TypeOrmCrudService.prototype.getJoinType = (relationType: string) => {
    return "leftJoin";
};

export abstract class BaseService<T> extends TypeOrmCrudService<T> {

    async deleteMany(ids: string) {
        return await this.repo.delete(ids.split(','));
    }
}