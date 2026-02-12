import { Module } from '@nestjs/common';
import { ZaloBotModule } from 'src/shared';
import { AqiModule } from '../aqi/aqi.module';
import { HoroscopeModule } from '../horoscope/horoscope.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [AqiModule, HoroscopeModule, ZaloBotModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
