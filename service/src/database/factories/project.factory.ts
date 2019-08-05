import * as Faker from 'faker';
import * as moment from 'moment';
import { define } from "typeorm-seeding";
import { Project, User, Metadata } from '../entities';
import { ProjectStatusEnum, IFModeEnum } from '../../core';

interface IProjectSetting {
    title?: string;
    cover?: string;
    views?: number;
    contact?: string;
    phone?: string;
    company?: string;
    payment?: string;
    publish_at?: string;
    amount?: number;
    purposes?: string;
    company_info?: string;
    team_info?: string;
    advantage?: string;
    progress?: string;
    info?: string;
    creator: User;
    status: ProjectStatusEnum;
    category: IFModeEnum;
    industry: Metadata;
    area: Metadata;
    stage: Metadata;
    exit_mode: Metadata[];
    withdrawal_year: Metadata;
    ratio: Metadata;
    data: Metadata[];
    risk: Metadata;
    interest: Metadata;
    occupancy_time: Metadata;
}

define(Project, (faker: typeof Faker, settings: IProjectSetting) => {
    const instance = new Project();

    instance.title = settings.title || faker.lorem.lines(1);
    instance.cover = settings.cover || faker.image.imageUrl(400, 200);
    instance.views = settings.views || faker.random.number({ min: 0, max: 20000 });
    instance.contact = settings.contact || faker.name.findName();
    instance.phone = settings.phone || faker.phone.phoneNumber();
    instance.company = settings.company || faker.company.companyName();
    instance.payment = settings.payment || faker.random.words(faker.random.number({ min: 0, max: 10 }));
    instance.publish_at = settings.publish_at || moment().format('YYYY-MM-DD HH:mm:ss');
    instance.amount = settings.amount || faker.random.number({ min: 1, max: 50 * 1000 });
    instance.purposes = settings.purposes || faker.lorem.paragraphs();
    instance.company_info = settings.company_info || faker.lorem.paragraphs();
    instance.team_info = settings.team_info || faker.lorem.paragraphs();
    instance.advantage = settings.advantage || faker.lorem.paragraphs();
    instance.progress = settings.progress || faker.lorem.paragraphs();
    instance.info = settings.info || faker.lorem.paragraphs();
    instance.creator = settings.creator;
    instance.industry = settings.industry;
    instance.area = settings.area;
    instance.stage = settings.stage;
    instance.exit_mode = settings.exit_mode;
    instance.withdrawal_year = settings.withdrawal_year;
    instance.ratio = settings.ratio;
    instance.data = settings.data;
    instance.risk = settings.risk;
    instance.interest = settings.interest;
    instance.occupancy_time = settings.occupancy_time;

    return instance;
})