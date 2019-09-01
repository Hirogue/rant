import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
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

    async recordAccess(ip: string, method: string, path: string, userAgent: string, statusCode: number) {

        try {
            await this.timeSeries.Client.writePoints([{
                measurement: MeasurementEnum.ACCESS,
                tags: { ip },
                fields: {
                    // @ts-ignore
                    method,
                    // @ts-ignore
                    path,
                    // @ts-ignore
                    userAgent,
                    // @ts-ignore
                    statusCode
                }
            }], {
                    retentionPolicy: '1year',
                    precision: 's'
                });
        } catch (err) {
            Logger.error(err);
        }
    }

    async recordModuleAccess(module: string, id: string, ip: string) {

        // 查询当天当前 IP 是否访问过 当前资源
        const result = await this.timeSeries.Client.query(`
                SELECT COUNT(id) 
                FROM "1day".${MeasurementEnum.MODULE_ACCESS}
                WHERE module = '${module}' 
                AND ip = '${ip}' 
                AND id = '${id}'     
            `);

        const info = result[0] || {};

        if (info['count'] > 0) return;

        await this.timeSeries.Client.writePoints([{
            measurement: MeasurementEnum.MODULE_ACCESS,
            tags: { ip },
            fields: {
                // @ts-ignore
                module,
                // @ts-ignore
                id,
            }
        }], {
                retentionPolicy: '1day',
                precision: 's'
            });

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
