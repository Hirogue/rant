import { Module, Global } from "@nestjs/common";
import { LoggerMiddleware } from "./middlewares";

@Global()
@Module({
    providers: [LoggerMiddleware]
})
export class CommonModule { }