import { Controller, Get, Render, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


const PAGE_URL = 'product';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class ProductController {
    

    @Get()
    @Render(PAGE_URL)
    @ApiOperation({ title: 'Index Page' })
    index(@Query('category') category) {

    }

    @Get('/detail')
    @Render(`${PAGE_URL}/detail`)
    @ApiOperation({ title: 'detail Page' })
    detail(@Query('id') id) {

    }
}
