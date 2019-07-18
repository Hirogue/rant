import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Config } from "../../packages";
import { User } from "./models";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(Config.orm),
        TypeOrmModule.forFeature([
            User
        ])
    ]
})
export class DatabaseModule { }