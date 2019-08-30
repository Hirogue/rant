import { Controller, Get, Render, Post, Body, Query, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = '/finance';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class FinanceController {
    

    @Get()
    @Render(PAGE_URL)
    @ApiOperation({ title: 'Index Page' })
    index() {
        
    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    @ApiOperation({ title: 'Detail Page' })
    detail() {

    }

    @Put()
    @ApiOperation({ title: 'update' })
    update() {
        
    }

    @Post()
    @ApiOperation({ title: 'Detail Page' })
    publish() {
        
    }
}
