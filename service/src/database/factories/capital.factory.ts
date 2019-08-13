import * as Faker from 'faker';
import * as moment from 'moment';
import { define } from "typeorm-seeding";
import { Capital, User, Metadata } from '../entities';
import { ProjectStatusEnum, IFModeEnum } from '../../core';

interface ICapitalSetting {
    title?: string;
    cover?: string;
    views?: number;
    contact?: string;
    phone?: string;
    company?: string;
    publish_at?: string;
    amount?: number;
    company_info?: string;
    info?: string;
    return?: string;
    pledge?: string;
    discount?: number;
    term?: number;
    pre_payment?: string;
    creator: User;
    status: ProjectStatusEnum;
    category: IFModeEnum;
    industry: Metadata[];
    type: Metadata[];
    area: Metadata;
    invest_area: Metadata[];
    data: Metadata[];
    equity_type: Metadata;
    risk: Metadata;
    stage: Metadata[];
    invest_type: Metadata[];
    ratio: Metadata;
}

define(Capital, (faker: typeof Faker, settings: ICapitalSetting) => {
    const instance = new Capital();

    instance.title = settings.title || faker.lorem.lines(1);
    instance.views = settings.views || faker.random.number({ min: 0, max: 20000 });
    instance.contact = settings.contact || faker.name.findName();
    instance.phone = settings.phone || faker.phone.phoneNumber();
    instance.company = settings.company || faker.company.companyName();

    instance.publish_at = settings.publish_at || moment().format('YYYY-MM-DD HH:mm:ss');
    instance.amount = settings.amount || faker.random.number({ min: 1, max: 50 * 1000 });

    instance.pre_payment = settings.pre_payment || faker.random.words(faker.random.number({ min: 0, max: 10 }));

    instance.return = settings.return || faker.lorem.paragraphs();
    instance.pledge = settings.pledge || faker.lorem.paragraphs();
    instance.discount = settings.discount || faker.random.number({ min: 0, max: 1, precision: 1 });
    instance.term = settings.term || faker.random.number({ min: 1, max: 30 });
    instance.info = settings.info || faker.lorem.paragraphs();
    instance.creator = settings.creator;
    instance.industry = settings.industry;
    instance.type = settings.type;
    instance.area = settings.area;
    instance.invest_area = settings.invest_area;
    instance.stage = settings.stage;
    instance.ratio = settings.ratio;
    instance.data = settings.data;
    instance.equity_type = settings.equity_type;
    instance.risk = settings.risk;
    instance.invest_type = settings.invest_type;

    instance.status = settings.status;
    instance.category = settings.category;

    return instance;
})