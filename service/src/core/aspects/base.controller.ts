import { Delete, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Crud, CrudController, CrudOptions, CrudRequest, ParsedRequest } from "@nestjsx/crud";
import * as deepmerge from 'deepmerge';
import { ClassType } from "type-graphql";
import { RequestInterceptor } from "../interceptors";
import { BaseService } from "./base.service";

export const AuthDecorators = [
    ApiBearerAuth(),
    UseGuards(AuthGuard('jwt'))
];

export function BaseController<TEntity>(
    TEntityClass: ClassType<TEntity>,
    options: Partial<CrudOptions> = {}
): any {

    const defaultOptions = {
        model: {
            type: TEntityClass
        },
        params: {
            id: {
                field: 'id',
                type: 'uuid',
                primary: true,
            }
        },
        query: {
            limit: 10,
            maxLimit: 1000,
            cache: 10 * 1000,
            sort: [{
                field: 'create_at', order: 'DESC'
            }],
        },
        routes: {
            exclude: ['createManyBase', 'replaceOneBase'],
            createOneBase: {
                decorators: AuthDecorators,
            },
            updateOneBase: {
                decorators: AuthDecorators,
            },
            deleteOneBase: {
                decorators: AuthDecorators,
            },
        }
    };

    @Crud(deepmerge(defaultOptions, options, { arrayMerge: (a, b, c) => b }))
    abstract class BaseController<TEntity> implements CrudController<TEntity>  {
        constructor(public service: BaseService<TEntity>) { }

        get base(): CrudController<TEntity> {
            return this;
        }

        static get<T extends any>(
            metadataKey: any,
            target: Object,
            propertyKey: string | symbol = undefined,
        ): T {
            return propertyKey
                ? Reflect.getMetadata(metadataKey, target, propertyKey)
                : Reflect.getMetadata(metadataKey, target);
        }

        @UseInterceptors(RequestInterceptor)
        @Get('search')
        @ApiOperation({ title: `Search ${TEntityClass.name}` })
        async search(@ParsedRequest() req: CrudRequest) {
            return this.service.getMany(req);
        }

        @Delete()
        @ApiOperation({ title: `Delete many ${TEntityClass.name}` })
        async deleteMany(@Query('ids') ids: string) {
            return this.service.deleteMany(ids);
        }

    }

    return BaseController;
}
