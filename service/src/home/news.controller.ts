import { Controller, Get, Render, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/news';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class NewsController {
    

    @Get()
    @Render(PAGE_URL)
    async index(@Query('category') category) {
        const common = await this.localService.getCommon(PAGE_URL);

        const news = await this.localService.getAllNews();

        return {
            ...common,
            news,
            category
        };
    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    async detail(@Query('id') id) {
        const detail = await this.localService.getNewsDetail(id);

        const common = await this.localService.getCommon(PAGE_URL, detail.detail.title);

        return {
            ...common,
            detail
        };
    }
}
