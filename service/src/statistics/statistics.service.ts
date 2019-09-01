import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Connection } from 'typeorm';
import { Article, Capital, Document, Product, Project, Provider } from '../database';
import { Logger } from '../logger';
import { MeasurementEnum, TimeSeriesService } from '../time-series';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly timeSeries: TimeSeriesService
    ) { }

    async logger(module: string, id: string, ip: string) {

        const date = moment();

        // 查询当天当前 IP 是否访问过 当前资源
        const result = await this.timeSeries.Client.query(`
                SELECT COUNT(id) 
                FROM ${MeasurementEnum.MODULE_ACCESS}
                WHERE module = '${module}' 
                AND ip = '${ip}' 
                AND id = '${id}'
                AND time >= '${date.startOf('day').format('YYYY-MM-DD HH:mm:ss')}'
                AND time <= '${date.endOf('day').format('YYYY-MM-DD HH:mm:ss')}'
                GROUP BY TIME(1d)
            `);

        const info = result[0] || {};

        if (info['count'] > 0) return;

        await this.timeSeries.Client.writePoints([{
            measurement: MeasurementEnum.MODULE_ACCESS,
            tags: { ip },
            fields: {
                // @ts-ignore left join only
                module,
                // @ts-ignore left join only
                id,
            }
        }]);

        try {
            // 修改数据库访问量
            const repo = this.connection.createEntityManager();
            let moduleClass = null;

            switch (module) {
                case 'product':
                    moduleClass = Product;
                    break;
                case 'provider':
                    moduleClass = Provider;
                    break;
                case 'project':
                    moduleClass = Project;
                    break;
                case 'capital':
                    moduleClass = Capital;
                    break;
                case 'article':
                    moduleClass = Article;
                    break;
                case 'document':
                    moduleClass = Document;
                    break;
            }

            if (moduleClass) {
                await repo.increment(moduleClass, { id }, 'views', 1);
            }

        } catch (err) {
            Logger.error(err);
        }
    }
}
