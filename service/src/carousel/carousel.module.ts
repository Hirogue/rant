import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carousel } from "../database";
import { CarouselController } from "./carousel.controller";
import { CarouselResolver } from "./carousel.resolver";
import { CarouselService } from "./carousel.service";

@Module({
    imports: [TypeOrmModule.forFeature([Carousel])],
    controllers: [CarouselController],
    providers: [
        CarouselService,
        CarouselResolver
    ]
})
export class CarouselModule { }