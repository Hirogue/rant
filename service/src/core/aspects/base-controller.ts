import { Delete, Query } from "@nestjs/common";
import { BaseService } from "./base.service";

export abstract class BaseController<T> {
    constructor(public service: BaseService<T>) { }

    @Delete()
    async deleteMany(@Query('ids') ids: string) {
        return this.service.deleteMany(ids);
    }
}