import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import Config from "../config";

@Controller('api/storage')
@UseGuards(AuthGuard('jwt'))
export class StorageController {

    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    local(@UploadedFiles() files) {

        return files.map(file => ({
            ...file,
            relativePath: `${Config.serverUrl}${Config.static.root}${Config.static.uploads}/${file.filename}`
        }));
    }

}