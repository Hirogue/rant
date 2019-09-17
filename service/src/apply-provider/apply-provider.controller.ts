import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { ApplyProvider } from "../database";
import { ApplyProviderService } from "./apply-provider.service";

@ApiUseTags('apply-provider')
@Controller('/api/apply-provider')
export class ApplyProviderController extends BaseController(ApplyProvider, {
    query: {
        join: {
            applicant: { eager: true },
            provider: { eager: true },
            'provider.category': { eager: true },
            'provider.creator': { eager: true },
            org: { eager: true },
            own: { eager: true },
        }
    }
}) {
    constructor(public service: ApplyProviderService) {
        super(service)
    }
}