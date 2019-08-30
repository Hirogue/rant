import { sample } from "lodash";
import { Connection, Like } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Project, User, Metadata, Capital } from "../entities";
import { IdentityEnum, ProjectStatusEnum, IFModeEnum } from "../../core";
import { join } from "path";
import { existsSync } from "fs";
import * as csv from 'csvtojson';

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {


        const rootPath = join(__dirname, '../../../../csv');
        const filePath = rootPath + '/dbt_projects.csv';
        // 判断 csv 文件夹是否存在
        if (existsSync(rootPath) && existsSync(filePath)) {
            const res = await csv().fromFile(filePath);
            for (let item of res) {
                const category = item.category;
                if (category == "PRJ_FINANCING") { //项目
                    const project = new Project();
                    project.title = item.title;
                    project.create_at = item.created_when;

                    const creator = await connection.getRepository(User).findOne({ where: { account: item.credential } });
                    project.creator = creator;

                    if (item.status == "OVER") {
                        project.status = ProjectStatusEnum.CHECKED;
                    } else if (item.status == "PENDING") {
                        project.status = ProjectStatusEnum.PENDING;
                    } else if (item.status == "FOLLOW") {
                        project.status = ProjectStatusEnum.FOLLOWING;
                    } else if (item.status =="REJECT") {
                        project.status = ProjectStatusEnum.REJECTED;
                    }

                    project.reason = item.reject_msg;
                    project.cover = item.thumbnail ? JSON.parse(item.thumbnail).url : null;
                    project.contact = item.contacts;
                    project.phone = item.phone;
                    project.company = item.company;

                    const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;
                    if (!!ex_info) {
                        const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};
                        const selectedTags = tags.selectedTags;
                        if (tags.selectedCategory == "股权融资") {
                            project.category = IFModeEnum.EQUITY;
                        } else {
                            project.category = IFModeEnum.CLAIM;
                        }
                        project.purposes = selectedTags['融资用途'].value;
                        project.company_info = selectedTags['公司介绍'].value;
                        project.team_info = selectedTags['团队介绍'].value;
                        project.advantage = selectedTags['项目优势'].value;
                        project.progress = selectedTags['项目进展'].value;
                        project.amount = selectedTags['融资金额'].value;
                        project.info = selectedTags['项目介绍'].value;
                        project.industry = await connection.getRepository(Metadata).findOne({ title: selectedTags['所属行业'].tags[0] });
                        const area = selectedTags['所在地区'].tags[0];
                        project.area = await connection.getRepository(Metadata).findOne({ where: { title: Like(`${area}%` ) } });
                        project.stage = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['所处阶段'].tags[0] } });
                        project.ratio = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['占股比例'].tags[0] } });
                        project.risk = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['风控要求'].tags[0] } });
                        project.interest = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['承担利息'].tags[0] } });
                        project.occupancy_time = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['资金占用时长'].tags[0] } });
                    
                        const data = selectedTags['可提供资料'].tags;
                        if (data.length > 0) {
                            project.data = [];
                            for (let apply_data of data) {
                                project.data.push(await connection.getRepository(Metadata).findOne({ where: { title: apply_data } }));
                            }
                        }

                        const exit_mode = selectedTags['退出方式'].tags;
                        if (exit_mode.length > 0) {
                            project.exit_mode = [];
                            for (let mode of exit_mode) {
                                project.exit_mode.push(await connection.getRepository(Metadata).findOne({ where: { title: mode } }));
                            }
                        }
                        
                    }
                    await connection.getRepository(Project).save(project);
                    await connection.getRepository(Project).update({title: item.title}, {create_at: item.created_when});

                } else { //资金
                    
                    const capital = new Capital();
                    capital.title = item.title;
                    capital.create_at = item.created_when;
                    capital.publish_at = item.created_when;

                    const creator = await connection.getRepository(User).findOne({ where: { account: item.credential } });
                    capital.creator = creator;

                    capital.contact = item.contacts;
                    capital.phone = item.phone;
                    capital.company = item.company;

                    if (item.status == "OVER") {
                        capital.status = ProjectStatusEnum.CHECKED;
                    } else if (item.status == "PENDING") {
                        capital.status = ProjectStatusEnum.PENDING;
                    } else if (item.status == "FOLLOW") {
                        capital.status = ProjectStatusEnum.FOLLOWING;
                    } else if (item.status =="REJECT") {
                        capital.status = ProjectStatusEnum.REJECTED;
                    }

                    const ex_info = item.ex_info ? JSON.parse(item.ex_info) : null;
                    if (!!ex_info) {
                        const tags = ex_info.tags ? JSON.parse(ex_info.tags) : {};;
                        const selectedTags = tags.selectedTags;
                        if (tags.selectedCategory == "股权投资") {
                            capital.category = IFModeEnum.EQUITY;
                        } else {
                            capital.category = IFModeEnum.CLAIM;
                        }
                        capital.amount = selectedTags['投资金额'].value;
                        capital.pre_payment = selectedTags['前期费用'].value ? selectedTags['前期费用'].value : '无';

                        const industry_types = selectedTags['行业类型'].tags;
                        if (industry_types.length > 0) {
                            capital.industry = [];
                            for (let industry_type of industry_types) {
                                capital.industry.push(await connection.getRepository(Metadata).findOne({ where: { title: industry_type } }));
                            }
                        }

                        const data = selectedTags['需提供资料'].tags;
                        if (data.length > 0) {
                            capital.data = [];
                            for (let apply_data of data) {
                                capital.data.push(await connection.getRepository(Metadata).findOne({ where: { title: apply_data } }));
                            }
                        }

                        const types = selectedTags['资金类型'].tags;
                        if (types.length > 0) {
                            capital.type = [];
                            for (let type of types) {
                                capital.type.push(await connection.getRepository(Metadata).findOne({ where: { title: type } }));
                            }
                        }

                        const locate_area = selectedTags['所在地区'].tags[0];
                        capital.area = await connection.getRepository(Metadata).findOne({ where: { title: Like(`${locate_area}%` ) } });

                        const invest_areas = selectedTags['投资地区'].tags;
                        if (invest_areas.length > 0) {
                            capital.invest_area = [];
                            for (let invest_area of invest_areas) {
                                capital.invest_area.push(await connection.getRepository(Metadata).findOne({ where: { title: Like(`${invest_area}%` ) } }));
                            }
                        }

                        capital.info = selectedTags['资金详情'].value;
                        capital.equity_type = selectedTags['参股类型'].value;

                        const invest_stages = selectedTags['投资阶段'].tags;
                        if (invest_stages.length > 0) {
                            capital.stage = [];
                            for (let invest_stage of invest_stages) {
                                capital.stage.push(await connection.getRepository(Metadata).findOne({ where: { title: invest_stage } }));
                            }
                        }

                        capital.term = selectedTags['投资期限'].value ? selectedTags['投资期限'].value : 1;

                        const invest_types = selectedTags['投资类型'].tags;
                        if (invest_types.length > 0) {
                            capital.invest_type = [];
                            for (let invest_type of invest_types) {
                                capital.invest_type.push(await connection.getRepository(Metadata).findOne({ where: { title: invest_type } }));
                            }
                        }

                        capital.ratio = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['占股比例'].tags[0] } });
                        capital.return = selectedTags['最低回报要求'].value ? selectedTags['最低回报要求'].value : '无';
                        capital.risk = await connection.getRepository(Metadata).findOne({ where: { title: selectedTags['风控要求'].tags[0] } });
                        capital.pledge = selectedTags['抵质押物类型'].value ? selectedTags['抵质押物类型'].value : '无';
                        capital.discount = selectedTags['抵质押物折扣率'].value ? selectedTags['抵质押物折扣率'].value : 0;

                    }
                    await connection.getRepository(Capital).save(capital);
                    await connection.getRepository(Capital).update({title: item.title}, {create_at: item.created_when});
                    
                }
            }

        } else {
            const industry = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '行业' })
            );
    
            const area = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '地区' })
            );
    
            const stage = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '阶段' })
            );
    
            const exit_mode = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '退出方式' })
            );
    
            const withdrawal_year = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '年限' })
            );
    
            const ratio = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '比例' })
            );
    
            const data = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '可提供资料' })
            );
    
            const risk = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '风控' })
            );
    
            const interest = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '利息' })
            );
    
            const occupancy_time = await connection.getTreeRepository(Metadata).findDescendants(
                await connection.getRepository(Metadata).findOne({ title: '时长' })
            );

            const users = await connection.getRepository(User).find({ identity: IdentityEnum.FINANCER });
            const status = Object.keys(ProjectStatusEnum).map(key => key);
            const category = Object.keys(IFModeEnum).map(key => key);

            for (let i = 0; i < 25; i++) {
    
                await factory(Project)({
                    creator: sample(users),
                    status: ProjectStatusEnum[sample(status)],
                    category: IFModeEnum[sample(category)],
                    industry: sample(industry),
                    area: sample(area),
                    stage: sample(stage),
                    exit_mode: [sample(exit_mode)],
                    withdrawal_year: sample(withdrawal_year),
                    ratio: sample(ratio),
                    data: [sample(data)],
                    risk: sample(risk),
                    interest: sample(interest),
                    occupancy_time: sample(occupancy_time),
                }).seed();
            }
        }

    }
}
