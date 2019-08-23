import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Capital, User } from '../database/entities';
import { FlowEventEnum, FlowIdEnum, WfService } from '../wf';

@Injectable()
export class CapitalService extends BaseService<Capital> {

    constructor(
        private readonly wf: WfService,
        @InjectRepository(Capital)
        protected readonly repo: Repository<Capital>
    ) {
        super(repo);
    }

    async publish(capital: Capital, currentUser: User) {

        capital.creator = currentUser;

        await this.wf.start(FlowIdEnum.PUBLISH_CAPITAL, capital);
        return true;
    }

    async approval(capital: Capital) {

        await this.wf.publish(
            FlowEventEnum.APPROVAL_CAPITAL,
            `${FlowEventEnum.APPROVAL_CAPITAL}-${capital.id}`,
            capital
        );
        return true;
    }
}
