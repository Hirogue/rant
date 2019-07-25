import { Module } from "@nestjs/common";
import { JsonScalar } from "./scalars";

@Module({
    providers: [JsonScalar],
    exports: [JsonScalar]
})
export class CoreModule { }