import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import Config from "../config";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

@ApiUseTags('storage')
@Controller('api/storage')
@UseGuards(AuthGuard('jwt'))
export class StorageController {


    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    @ApiOperation({ title: 'Uplaod files to local storage' })
    local(@UploadedFiles() files) {

        const fileList = files.map(file => ({
            ...file,
            relativePath: `${Config.serverUrl}${Config.static.root}${Config.static.uploads}/${file.filename}`
        }));

        return fileList.length === 1 ? fileList[0] : fileList;
    }

}