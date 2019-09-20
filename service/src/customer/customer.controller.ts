import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
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
    }
}) {
    constructor(public service: CustomerService) {
        super(service)
    }
}