import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Amount } from "../database";
import { AmountController } from "./amount.controller";
import { AmountResolver } from "./amount.resolver";
import { AmountService } from "./amount.service";

@Module({
    imports: [TypeOrmModule.forFeature([Amount])],
    controllers: [AmountController],
    providers: [AmountService, AmountResolver],
})
export class AmountModule { }