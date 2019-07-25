import { Module } from "@nestjs/common";
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as shortid from 'shortid';
import * as moment from 'moment';
import { Logger } from "../common/logger";
import Config from "../config";
import { StorageController } from "./storage.controller";
import { promisify } from "util";
import { exists, mkdir } from "fs";
import { resolve } from "path";

const existsAsync = promisify(exists);
const mkdirAsync = promisify(mkdir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resolve(`./${Config.static.root}${Config.static.uploads}`))
    },
    filename: async (req, file, cb) => {

        const dirName = moment().format('YYYY-MM-DD');
        const dirPath = resolve(`./${Config.static.root}${Config.static.uploads}`) + '/' + dirName;

        if (!await existsAsync(dirPath)) {
            await mkdirAsync(dirPath);
        }

        const finalName = `${dirName}/${shortid.generate()}-${file.originalname}`;

        Logger.log('upload finalPath:', dirPath + finalName);

        cb(null, finalName);
    }
});

@Module({
    imports: [
        MulterModule.register({
            storage
        })
    ],
    controllers: [StorageController]
})
export class StorageModule { }