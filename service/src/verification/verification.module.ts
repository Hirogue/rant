import { Module } from "@nestjs/common";
import { CacheModule } from '../cache';
import { VerificationController } from "./verification.controller";
import { VerificationService } from "./verification.service";

@Module({
    imports: [CacheModule],
    controllers: [VerificationController],
    providers: [VerificationService],
    exports: [VerificationService]
})
export class VerificationModule { }