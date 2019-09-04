import { Controller, Get, Post, Render } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from "@nestjs/swagger";

const PAGE_URL = 'user';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class UserController {

    @Get('')
    @Render(PAGE_URL)
    @ApiOperation({ title: 'Index Page' })
    user() { }

    @Get('/publish/funding/:id')
    @Render(`${PAGE_URL}/publish/funding`)
    @ApiOperation({ title: 'publish' })
    publishFunding() { }

    @Get('/apply')
    @ApiOperation({ title: 'apply' })
    apply() { }

    @Get('/apply/project')
    @Render(`${PAGE_URL}/apply/project`)
    @ApiOperation({ title: 'apply project' })
    applyProject() { }

    @Post('/apply/project')
    @ApiOperation({ title: 'apply project post' })
    applyProjectPost() { }

    @Post('/apply/product')
    @ApiOperation({ title: 'apply product post' })
    applyProductPost() { }

    @Post('/apply/service')
    @ApiOperation({ title: 'apply service post' })
    applyServicePost() { }

    @Post('/apply/content')
    @ApiOperation({ title: 'apply content post' })
    applyContentPost() { }

    @Get('/apply/service')
    @Render(`${PAGE_URL}/apply/service`)
    @ApiOperation({ title: 'apply service' })
    applyService() { }

    @Get('/funding')
    @Render(`${PAGE_URL}/funding`)
    @ApiOperation({ title: 'user funding' })
    userFunding() { }

    @Get('/product')
    @Render(`${PAGE_URL}/product`)
    @ApiOperation({ title: 'user product' })
    userProduct() { }

    @Get('/project')
    @Render(`${PAGE_URL}/project`)
    @ApiOperation({ title: 'user project' })
    userProject() { }

    @Get('/service')
    @Render(`${PAGE_URL}/service`)
    @ApiOperation({ title: 'user service' })
    userService() { }

    @Get('/publish/funding')
    @Render(`${PAGE_URL}/publish/funding`)
    @ApiOperation({ title: 'user publish funding' })
    userPublishFunding() { }

    @Get('/publish/project')
    @Render(`${PAGE_URL}/publish/project`)
    @ApiOperation({ title: 'user publish project' })
    userPublishProject() { }
}
