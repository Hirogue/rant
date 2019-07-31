import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class HomeControlelr {

    @Get()
    @Render('Index')
    index() {

    }
}