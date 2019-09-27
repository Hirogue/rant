import { Controller, Get, Render } from "@nestjs/common";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

const PAGE_URL = 'topic';

@ApiUseTags('ssr')
@Controller(PAGE_URL)
export class TopicController {

    @Get()
    @Render(PAGE_URL)
    @ApiOperation({ title: '发展促进会' })
    index() { }

}