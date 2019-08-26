import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Authority } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        // await factory(Authority)({

        // }).seed();

    }
}
