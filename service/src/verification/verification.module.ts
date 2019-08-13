import { Module, forwardRef } from "@nestjs/common";
import { CacheModule } from '../cache';
import { VerificationController } from "./verification.controller";
import { VerificationService } from "./verification.service";
import { UserModule } from "../user";

@Module({
    imports: [
        CacheModule,
        forwardRef(() => UserModule)
    ],
    controllers: [VerificationController],
    providers: [VerificationService],
    exports: [VerificationService]
})
export class VerificationModule { }