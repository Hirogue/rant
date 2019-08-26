import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Authority } from "../database";
import { AuthorityController } from "./authority.controller";
import { AuthorityResolver } from "./authority.resolver";
import { AuthorityService } from "./authority.service";

@Module({
    imports: [TypeOrmModule.forFeature([Authority])],
    controllers: [AuthorityController],
    providers: [
        AuthorityService,
        AuthorityResolver
    ]
})
export class AuthorityModule { }