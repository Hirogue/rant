import { Module } from "@nestjs/common";
import { HomeControlelr } from "./home.controller";

@Module({
    controllers: [HomeControlelr]
})
export class HomeModule { }