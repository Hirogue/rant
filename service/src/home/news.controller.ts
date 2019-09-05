import { Controller, Get, Render, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = 'news';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class NewsController {
    

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
}
