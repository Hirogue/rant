import { Controller, Get, Res } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { join } from "path";

@ApiUseTags('spa')
@Controller()
export class SpaController {

    @Get('admin/*')
    admin(@Res() res) {
        return res.sendFile(
            join(__dirname, '../../../admin/dist', 'index.html')
        );
    }

    @Get('lvyoto/*')
    lvyoto(@Res() res) {
        return res.sendFile(
            join(__dirname, '../../../lvyoto/dist', 'index.html')
        );
    }
}