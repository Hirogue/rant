import { Base } from "./base";
import { Column, Entity } from "typeorm";

@Entity()
export class Article extends Base {
    @Column()
    name: string;
}