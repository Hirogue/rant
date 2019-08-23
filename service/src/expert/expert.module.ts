import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expert } from "../database";
import { ExpertController } from "./expert.controller";
import { ExpertResolver } from "./expert.resolver";
import { ExpertService } from "./expert.service";

@Module({
    imports: [TypeOrmModule.forFeature([Expert])],
    controllers: [ExpertController],
    providers: [
        ExpertService,
        ExpertResolver
    ]
})
export class ExpertModule { }