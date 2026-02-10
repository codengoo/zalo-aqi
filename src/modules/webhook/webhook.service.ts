import { Injectable } from '@nestjs/common';
import { ZaloBotService } from '../../shared/zalo-bot/zalo-bot.service';
import { AqiService } from '../aqi/aqi.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly aqiService: AqiService,
    private readonly zaloBotService: ZaloBotService,
  ) {}

  async sendCurrentAqi() {
    // Fetch AQI data for Hanoi
    const aqiData = await this.aqiService.getCityData({
      city: 'Hanoi',
      state: 'Ha Noi',
      country: 'Vietnam',
    });

    // Format message
    const { city, current } = aqiData;
    const { pollution, weather } = current;

    const message =
      `🌤️ Chất lượng không khí tại ${city}\n\n` +
      `📊 Chỉ số AQI: ${pollution.aqius} (US)\n` +
      `🌡️ Nhiệt độ: ${weather.tp}°C\n` +
      `💧 Độ ẩm: ${weather.hu}%\n` +
      `💨 Tốc độ gió: ${weather.ws} m/s\n` +
      `🧭 Hướng gió: ${weather.wd}°\n\n` +
      `⏰ Thời gian: ${new Date(pollution.ts).toLocaleString('vi-VN')}`;

    // Send message to specific user
    const chatId = 'ae3d13526a03835dda12';
    const result = await this.zaloBotService.sendMessage(chatId, message);

    return {
      success: true,
      aqiData,
      messageResult: result,
    };
  }
}
