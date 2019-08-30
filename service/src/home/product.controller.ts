import { Controller, Get, Render, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/product';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ProductController {
    

    @Get()
    @Render(PAGE_URL)
    async index(@Query('category') category) {
        const common = await this.localService.getCommon(PAGE_URL);

        const list = await this.localService.getProductList();

        return {
            ...common,
            list,
            category
        };
    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    async detail(@Query('id') id) {
        const detail = await this.localService.getProductDetail(id);

        const common = await this.localService.getCommon(PAGE_URL, detail.name);

        return {
            ...common,
            detail
        };
    }
}
