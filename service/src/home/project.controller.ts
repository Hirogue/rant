import { Controller, Get, Render, Post, Body, Query, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/project';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ProjectController {
    

    @Get()
    @Render(PAGE_URL)
    @ApiOperation({ title: 'Index Page' })
    index() {

    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    @ApiOperation({ title: 'detail Page' })
    detail() {

    }

    @Put()
    @ApiOperation({ title: 'update' })
    update() {

    }

    @Post()
    @ApiOperation({ title: 'publish' })
    publish() {

    }
}
