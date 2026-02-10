import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ZaloBotModule } from "./shared/zalo-bot";
import { DebugService } from "./modules/debug/debug.service";
import { DebugModule } from "./modules/debug/debug.module";
import { AqiModule } from "./modules/aqi/aqi.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DebugModule,
    AqiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
