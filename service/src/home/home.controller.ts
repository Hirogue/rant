import { Controller, Get, Render } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";


@ApiUseTags('ssr')
@Controller()
export class HomeController {


    @Get()
    @Render('Index')
    @ApiOperation({ title: 'Index Page' })
    Index() { }

    @Get('/help')
    @Render('help')
    @ApiOperation({ title: 'help Page' })
    help() { }

    @Get('/login')
    @Render('login')
    @ApiOperation({ title: 'login Page' })
    login() { }

    @Get('/forgot')
    @Render('fotgot')
    @ApiOperation({ title: 'fotgot Page' })
    fotgot() { }
}