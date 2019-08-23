import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { BaseController } from "../core";
import { Carousel } from "../database";
import { CarouselService } from "./carousel.service";

@ApiUseTags('carousel')
@Controller('/api/carousel')
export class CarouselController extends BaseController(Carousel) {
    constructor(public service: CarouselService) {
        super(service)
    }
}