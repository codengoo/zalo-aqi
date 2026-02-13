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

  @Get('send-horoscope')
  @ApiOperation({ summary: 'Fetch horoscope for Ngọ (Horse) and send via Zalo bot' })
  async sendHoroscope() {
    return this.webhookService.sendHoroscope();
  }

  @Get('send-word-of-the-day')
  @ApiOperation({ summary: 'Fetch Word of the Day and send via Zalo bot' })
  async sendWordOfTheDay() {
    return this.webhookService.sendWordOfTheDay();
  }

  @Get('send-violation')
  @ApiOperation({ summary: 'Lookup traffic violation and send via Zalo bot' })
  async sendViolation() {
    return this.webhookService.sendViolationLookup();
  }
}
