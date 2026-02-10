import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ZaloBotService } from "./zalo-bot.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const botToken = config.get<string>("ZALO_BOT_TOKEN");
        console.log("botToken:", botToken);

        return {
          baseURL: `https://bot-api.zaloplatforms.com/bot${botToken}/`,
          timeout: 10000,
        };
      },
    }),
  ],
  providers: [ZaloBotService],
  exports: [ZaloBotService],
})
export class ZaloBotModule {}
