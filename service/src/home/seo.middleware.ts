import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SeoService } from '../seo/seo.service';
import { Like } from 'typeorm';
import Config from '../config';

@Injectable()
export class SeoMiddleware implements NestMiddleware {

    constructor(private readonly seoService: SeoService) { }

    async use(req: Request, res: Response, next: Function) {

        const seo = await this.seoService.findOne({
            where: {
                path: Like(`%${req.query['seoPath'] || req.url}%`)
            },
            order: {
                sort: 'ASC'
            }
        });

        req['viewData'] = { seo: seo || Config.seo };

        next();
    }
}
