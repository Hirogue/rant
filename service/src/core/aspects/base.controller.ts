import { Delete, Query } from "@nestjs/common";
import { BaseService } from "./base.service";
import { ApiOperation } from "@nestjs/swagger";
import { CrudController } from "@nestjsx/crud";

export abstract class BaseController<T> implements CrudController<T>  {
    constructor(public service: BaseService<T>) { }

    get base(): CrudController<T> {
        return this;
    }

    @Delete()
    @ApiOperation({ title: 'Delete many' })
    async deleteMany(@Query('ids') ids: string) {
        return this.service.deleteMany(ids);
    }

}