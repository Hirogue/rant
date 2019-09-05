import { Controller, Get, Render, Session, Post, Body, Param, Query, Put, Req } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = 'about';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class AboutController {
    

    @Get()
    @Render(PAGE_URL)
    @ApiOperation({ title: 'About Page' })
    index() {
    }
}
