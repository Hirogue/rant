import { sample } from "lodash";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Project, User, Metadata } from "../entities";
import { IdentityEnum, ProjectStatusEnum, IFModeEnum } from "../../core";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const users = await connection.getRepository(User).find({ identity: IdentityEnum.FINANCER });
        const status = Object.keys(ProjectStatusEnum).map(key => key);
        const category = Object.keys(IFModeEnum).map(key => key);

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
