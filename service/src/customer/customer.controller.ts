import { Controller, Post, Body } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Customer } from "../database";
import { CustomerService } from "./customer.service";

@ApiUseTags('customer')
@Controller('/api/customer')
export class CustomerController extends BaseController(Customer, {
    query: {
        join: {
            area: { eager: true }
        }
    },
    routes: {
        createOneBase: {
            decorators: []
        },
    }
}) {
    constructor(public service: CustomerService) {
        super(service)
    }

    @Post('import')
    @ApiOperation({ title: `Import data` })
    async import(@Body() data: any) {
        return await this.service.importData(data);
    }
}