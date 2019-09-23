import { Injectable, NestMiddleware } from '@nestjs/common';
import * as config from 'config';
import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { SeoService } from '../seo/seo.service';

@Injectable()
export class SeoMiddleware implements NestMiddleware {
  constructor(private readonly seoService: SeoService) { }

  async use(req: Request, res: Response, next: Function) {
    const seo = await this.seoService.findOne({
      where: {
        path: Like(`%${req.query['seoPath'] || req.url}%`),
      },
      order: {
        sort: 'ASC',
      },
    });

    req['viewData'] = { seo: seo || config.get('seo') };

    next();
  }
}
