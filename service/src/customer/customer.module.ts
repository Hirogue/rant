import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../database";
import { CustomerController } from "./customer.controller";
import { CustomerResolver } from "./customer.resolver";
import { CustomerService } from "./customer.service";
import { VerificationModule } from "../verification";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        VerificationModule,
    ],
    controllers: [CustomerController],
    providers: [
        CustomerService,
        CustomerResolver
    ]
})
export class CustomerModule { }