import { Controller, Get, Query } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { Repository } from "typeorm";
import { IdentityEnum, UserTypeEnum } from "../core";
import { User } from "../database";

@ApiUseTags('statistics')
@Controller('/api/statistics')
export class StatisticsController {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    @Get('users')
    async users(@Query() query) {
        const {
            groupBy = 'day',
            startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            type = 'identity'
        } = query;

        const builder = this.userRepo.createQueryBuilder('t');

        if ('day' === groupBy) {
            builder.select(`
                TO_CHAR(t.create_at, 'YYYY-MM-DD') AS day
            `);
        } else {
            builder.select(`
                TO_CHAR(t.create_at, 'YYYY-MM') AS month
            `);
        }


        builder.where('t.create_at BETWEEN :startDate AND :endDate', {
            startDate,
            endDate
        });

        if ('subject' === type) {
            builder.addSelect(`
                COUNT(*) FILTER(WHERE t.type = '${UserTypeEnum.PERSONAL}') AS personal,     
                COUNT(*) FILTER(WHERE t.type = '${UserTypeEnum.ENTERPRISE}') AS enterprise     
            `);
        }

        if ('identity' === type) {
            builder.addSelect(`
                COUNT(*) FILTER(WHERE t.identity = '${IdentityEnum.FINANCER}') AS financer,     
                COUNT(*) FILTER(WHERE t.identity = '${IdentityEnum.INVESTOR}') AS investor,     
                COUNT(*) FILTER(WHERE t.identity = '${IdentityEnum.PROVIDER}') AS provider,     
                COUNT(*) FILTER(WHERE t.identity = '${IdentityEnum.TOURIST}') AS tourist
            `);
        }

        return builder
            .groupBy(groupBy)
            .orderBy(groupBy, 'ASC')
            .getRawMany();
    }
}