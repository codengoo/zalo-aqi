import { Module } from '@nestjs/common';
import { MessageFormatModule, ZaloBotModule } from 'src/shared';
import { AqiModule } from '../aqi/aqi.module';
import { HoroscopeModule } from '../horoscope/horoscope.module';
import { ViolationModule } from '../violation/violation.module';
import { WordModule } from '../word/word.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [
    AqiModule,
    HoroscopeModule,
    WordModule,
    ViolationModule,
    MessageFormatModule,
    ZaloBotModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
