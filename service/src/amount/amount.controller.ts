import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Crud } from "@nestjsx/crud";
import { BaseTreeController } from "../core";
import { Amount } from "../database";
import { AmountService } from "./amount.service";

@Crud({
    model: {
        type: Amount,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    }
})
@ApiUseTags('amount')
@ApiBearerAuth()
@Controller('/api/amount')
@UseGuards(AuthGuard('jwt'))
export class AmountController extends BaseTreeController<Amount> {
    constructor(public service: AmountService) {
        super(service)
    }
}