import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AqiModule } from './modules/aqi/aqi.module';
import { DebugModule } from './modules/debug/debug.module';
import { HoroscopeModule } from './modules/horoscope/horoscope.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { WordModule } from './modules/word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DebugModule,
    AqiModule,
    WebhookModule,
    HoroscopeModule,
    WordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
