import { sample } from "lodash";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { IdentityEnum, IFModeEnum, ProjectStatusEnum } from "../../core";
import { Capital, Metadata, User } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const users = await connection.getRepository(User).find({ identity: IdentityEnum.INVESTOR });
        const status = Object.keys(ProjectStatusEnum).map(key => key);
        const category = Object.keys(IFModeEnum).map(key => key);

        const industry = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '行业' })
        );

        const type = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '资金类型' })
        );

        const area = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '地区' })
        );

        const stage = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '阶段' })
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

        const equity_type = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '参股类型' })
        );

        const invest_type = await connection.getTreeRepository(Metadata).findDescendants(
            await connection.getRepository(Metadata).findOne({ title: '投资类型' })
        );

        /*
        for (let i = 0; i < 25; i++) {

            await factory(Capital)({
                creator: sample(users),
                status: ProjectStatusEnum[sample(status)],
                category: IFModeEnum[sample(category)],
                industry: [sample(industry)],
                type: [sample(type)],
                area: sample(area),
                invest_area: [sample(area)],
                invest_type: [sample(invest_type)],
                stage: [sample(stage)],
                ratio: sample(ratio),
                data: [sample(data)],
                equity_type: sample(equity_type),
                risk: sample(risk),
            }).seed();
        }
        */

    }
}
