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
    @ApiOperation({ title: 'Help Page' })
    help() { }

    @Get('/login')
    @Render('login')
    @ApiOperation({ title: 'Login Page' })
    login() { }

    @Get('/forgot')
    @Render('fotgot')
    @ApiOperation({ title: 'Fotgot Page' })
    fotgot() { }
}