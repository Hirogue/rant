import { forwardRef, Module } from "@nestjs/common";
import { CacheModule } from '../cache';
import { MessageQueueModule } from "../message-queue";
import { UserModule } from "../user";
import { VerificationController } from "./verification.controller";
import { VerificationService } from "./verification.service";

@Module({
    imports: [
        CacheModule,
        MessageQueueModule,
        forwardRef(() => UserModule)
    ],
    controllers: [VerificationController],
    providers: [VerificationService],
    exports: [VerificationService]
})
export class VerificationModule { }