import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseController } from "../core";
import { Provider } from "../database";
import { ProviderService } from "./provider.service";

@Crud({
    model: {
        type: Provider
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        limit: 10,
        maxLimit: 100,
        cache: 10 * 1000,
        sort: [
            {
                field: 'create_at',
                order: 'DESC',
            },
        ],
        join: {
            category: {},
            area: {},
            creator: {},
        }
    }
})
@ApiUseTags('provider')
@ApiBearerAuth()
@Controller('/api/provider')
@UseGuards(AuthGuard('jwt'))
export class ProviderController extends BaseController<Provider> {
    constructor(public service: ProviderService) {
        super(service)
    }
}