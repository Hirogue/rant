import { Controller, Get, Render, Post, Body, Query, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/service';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ServiceController {
    

    @Get()
    @Render(PAGE_URL)
    async index(@Query('category') category) {
        const common = await this.localService.getCommon(PAGE_URL);

        const list = await this.localService.getServiceList();

        return {
            ...common,
            list,
            category
        };
    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    async detail(@Query('id') id) {
        const detail = await this.localService.getServiceDetail(id);

        const common = await this.localService.getCommon(PAGE_URL, detail.name);

        return {
            ...common,
            detail
        };
    }

    @Post()
    async create(@Body() payload) {
        return await this.localService.publishService(payload);
    }

    @Put()
    async update(@Body() payload) {
        return await this.localService.updateService(payload);
    }
}
