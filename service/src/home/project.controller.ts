import { Controller, Get, Render, Post, Body, Query, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/project';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ProjectController {
    

    @Get()
    @Render(PAGE_URL)
    async index(@Query('category') category) {
        const common = await this.localService.getCommon(PAGE_URL);

        const list = await this.localService.getProjectList();
        const visits = await this.localService.getVisits(`${PAGE_URL}/detail`);

        return {
            ...common,
            list,
            category,
            visits
        };
    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    async detail(@Query('id') id) {
        const detail = await this.localService.getProjectDetail(id);

        const list = await this.localService.getRecommendProject({
            category: 'PRJ_FINANCING',
            id: detail.id
        });

        const common = await this.localService.getCommon(PAGE_URL, detail.title);
        const visits = await this.localService.getVisits(`${PAGE_URL}/detail`);

        return {
            ...common,
            detail,
            list,
            visits
        };
    }

    @Put()
    async update(@Body() payload) {
        return await this.localService.updateProject(payload);
    }

    @Post()
    async publish(@Body() payload) {
        return await this.localService.publishProject(payload);
    }
}
