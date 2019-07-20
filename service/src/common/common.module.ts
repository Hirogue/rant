import { Module, Global } from "@nestjs/common";
import { LoggerModule } from "./logger";

@Global()
@Module({
    imports: [LoggerModule]
})
export class CommonModule { }