import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Provider } from "../database";
import { ProviderService } from "./provider.service";

@ApiUseTags('provider')
@Controller('/api/provider')
export class ProviderController extends BaseController(Provider, {
    query: {
        join: {
            category: {},
            area: {},
            creator: {},
        }
    }
}) {
    constructor(public service: ProviderService) {
        super(service)
    }
}