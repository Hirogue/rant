import { Delete, Query } from "@nestjs/common";
import { BaseService } from "./base.service";
import { ApiOperation } from "@nestjs/swagger";

export abstract class BaseController<T> {
    constructor(public service: BaseService<T>) { }

    @Delete()
    @ApiOperation({ title: 'Delete many' })
    async deleteMany(@Query('ids') ids: string) {
        return this.service.deleteMany(ids);
    }
}