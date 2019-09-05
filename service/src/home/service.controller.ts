import { Controller, Get, Render, Post, Body, Query, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = 'service';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ServiceController {
    

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

    @Post()
    @ApiOperation({ title: 'create' })
    create() {

    }

    @Put()
    @ApiOperation({ title: 'update' })
    update() {
        
    }
}
