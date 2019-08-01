import { Controller, Get, Render } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

@ApiUseTags('ssr')
@Controller()
export class HomeController {

    @Get()
    @Render('Index')
    @ApiOperation({ title: 'Index Page' })
    index() { }
}