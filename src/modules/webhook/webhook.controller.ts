import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get('send-current-aqi')
  @ApiOperation({ summary: 'Fetch Hanoi AQI data and send via Zalo bot' })
  async sendCurrentAqi() {
    return this.webhookService.sendCurrentAqi();
  }
}
