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
            startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            type = 'identity'
        } = query;

        const builder = this.userRepo.createQueryBuilder('t');

        builder.select(`TO_CHAR(t.create_at, 'YYYY-MM-DD') AS day`);

        builder.where('t.create_at BETWEEN :startDate AND :endDate', {
            startDate,
            endDate
        });

        if ('subject' === type) {
            builder.addSelect(`
                count(*) FILTER(WHERE t.type = '${UserTypeEnum.PERSONAL}') AS personal,     
                count(*) FILTER(WHERE t.type = '${UserTypeEnum.ENTERPRISE}') AS enterprise     
            `);
        }

        if ('identity' === type) {
            builder.addSelect(`
                count(*) FILTER(WHERE t.identity = '${IdentityEnum.FINANCER}') AS financer,     
                count(*) FILTER(WHERE t.identity = '${IdentityEnum.INVESTOR}') AS investor,     
                count(*) FILTER(WHERE t.identity = '${IdentityEnum.PROVIDER}') AS provider,     
                count(*) FILTER(WHERE t.identity = '${IdentityEnum.TOURIST}') AS tourist
            `);
        }

        return builder
            .groupBy('day')
            .orderBy('day', 'ASC')
            .getRawMany();
    }
}