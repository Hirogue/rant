import { Controller, Get, Res, Req } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { join } from "path";

@ApiUseTags('spa')
@Controller()
export class SpaController {

    @Get('admin/*')
    admin(@Req() req, @Res() res) {
        // res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            join(__dirname, '../../../admin/dist', 'index.html')
        );
    }

    @Get('app/lvyoto/*')
    lvyoto(@Req() req, @Res() res) {
        return res.sendFile(
            join(__dirname, '../../../lvyoto/dist', 'index.html')
        );
    }
}