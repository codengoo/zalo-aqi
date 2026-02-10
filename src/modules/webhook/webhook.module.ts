import { Module } from '@nestjs/common';
import { ZaloBotModule } from 'src/shared';
import { AqiModule } from '../aqi/aqi.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [AqiModule, ZaloBotModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
