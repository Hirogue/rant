import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Link } from "../database";
import { LinkController } from "./link.controller";
import { LinkResolver } from "./link.resolver";
import { LinkService } from "./link.service";

@Module({
    imports: [TypeOrmModule.forFeature([Link])],
    controllers: [LinkController],
    providers: [
        LinkService,
        LinkResolver
    ],
    exports: [LinkService]
})
export class LinkModule { }