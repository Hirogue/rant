import { Module, Global } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Config } from "../../config";
import { User } from "./models";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
            User
        ])
    ]
})
export class DatabaseModule { }