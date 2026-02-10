import { Module } from "@nestjs/common";
import { DebugController } from "./debug.controller";
import { DebugService } from "./debug.service";
import { ZaloBotModule } from "src/shared";

@Module({
    imports: [ZaloBotModule],
    controllers: [DebugController],
    providers: [DebugService],
})
export class DebugModule {}