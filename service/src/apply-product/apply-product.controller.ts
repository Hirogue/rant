import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { ApplyProduct } from "../database";
import { ApplyProductService } from "./apply-product.service";

@ApiUseTags('apply-product')
@Controller('/api/apply-product')
export class ApplyProductController extends BaseController(ApplyProduct, {
    query: {
        join: {
            applicant: { eager: true },
            product: { eager: true },
            'product.category': { eager: true },
            org: { eager: true },
            own: { eager: true },
        }
    }
}) {
    constructor(public service: ApplyProductService) {
        super(service)
    }
}