import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

export abstract class BaseService<T> extends TypeOrmCrudService<T> { }