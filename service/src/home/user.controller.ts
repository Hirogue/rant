import { Controller, Get, Render, Session, Post, Body, Param, Query, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

const PAGE_URL = '/user';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class UserController {

    @Get('')
    @Render(PAGE_URL)
    async user() { }

    @Get('/publish/funding/:id')
    @Render(`${PAGE_URL}/publish/funding`)
    async publishFunding() {}

    @Get('/apply')
    async apply() {}

    @Get('/apply/project')
    @Render(`${PAGE_URL}/apply/project`)
    async applyProject() {}

    @Post('/apply/project')
    async applyProjectPost() {}

    @Post('/apply/product')
    async applyProductPost() {}

    @Post('/apply/service')
    async applyServicePost() {}

    @Post('/apply/content')
    async applyContentPost() {}

    @Get('/apply/service')
    @Render(`${PAGE_URL}/apply/service`)
    async applyService() {}

    @Get('/funding')
    @Render(`${PAGE_URL}/funding`)
    async userFunding() {}

    @Get('/product')
    @Render(`${PAGE_URL}/product`)
    async userProduct() {}

    @Get('/project')
    @Render(`${PAGE_URL}/project`)
    async userProject() {}

    @Get('/service')
    @Render(`${PAGE_URL}/service`)
    async userService() {}

    @Get('/publish/funding')
    @Render(`${PAGE_URL}/publish/funding`)
    async userPublishFunding() {}

    @Get('/publish/project')
    @Render(`${PAGE_URL}/publish/project`)
    async userPublishProject() {}
}
