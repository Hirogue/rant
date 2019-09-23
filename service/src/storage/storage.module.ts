import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { accessSync, mkdir } from 'fs';
import * as moment from 'moment';
import * as multer from 'multer';
import { resolve } from 'path';
import * as shortid from 'shortid';
import { promisify } from 'util';
import Config from '../config';
import { StorageController } from './storage.controller';

const mkdirAsync = promisify(mkdir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(`./${Config.static.root}${Config.static.uploads}`));
  },
  filename: async (req, file, cb) => {
    const dirName = moment().format('YYYY-MM-DD');
    const dirPath =
      resolve(`./${Config.static.root}${Config.static.uploads}`) +
      '/' +
      dirName;

    try {
      accessSync(dirPath);
    } catch (e) {
      await mkdirAsync(dirPath);
    }

    const finalName = `${dirName}/${shortid.generate()}-${req['body']
      .fileName || file.originalname}`;

    cb(null, finalName);
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [StorageController],
})
export class StorageModule {}
