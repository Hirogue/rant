import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

export abstract class BaseService<T> extends TypeOrmCrudService<T> {

    async deleteMany(ids: string) {
        return await this.repo.delete(ids.split(','));
    }
}