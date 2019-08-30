import { Controller, Get, Render, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/search';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class SearchController {
    

    @Get()
    @Render(PAGE_URL)
    async index(@Query() payload) {
        const common = await this.localService.getCommon();

        const list = await this.localService.search(payload.searchCategory, payload.keyword);

        return {
            ...common,
            list,
            searchCategory: payload.searchCategory,
            keyword: payload.keyword
        };
    }
}
