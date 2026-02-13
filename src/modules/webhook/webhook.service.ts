import { Injectable } from '@nestjs/common';
import { ZaloBotService } from '../../shared';
import { AqiService } from '../aqi/aqi.service';
import { HoroscopeService } from '../horoscope/horoscope.service';
import { VietnameseZodiac } from '../horoscope/interfaces';
import { WordService } from '../word/word.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly aqiService: AqiService,
    private readonly horoscopeService: HoroscopeService,
    private readonly wordService: WordService,
    private readonly zaloBotService: ZaloBotService,
  ) {}

  async sendCurrentAqi() {
    // Fetch AQI data for Hanoi
    const aqiData = await this.aqiService.getCityData({
      city: 'Hanoi',
      state: 'Ha Noi',
      country: 'Vietnam',
    });

    // Fetch world ranking data
    const worldRanking = await this.aqiService.getWorldRanking();

    // Format message
    const { city, current } = aqiData;
    const { pollution, weather } = current;

    let message1 =
      `🌤️ Chất lượng không khí tại ${city}\n\n` +
      `📊 Chỉ số AQI: ${pollution.aqius} (US)\n` +
      `🌡️ Nhiệt độ: ${weather.tp}°C\n` +
      `💧 Độ ẩm: ${weather.hu}%\n` +
      `💨 Tốc độ gió: ${weather.ws} m/s\n` +
      `🧭 Hướng gió: ${weather.wd}°\n\n`;

    let message2 = '';
    // Add Hanoi ranking if available
    if (worldRanking.hanoiRanking) {
      message2 +=
        `🏆 XẾP HẠNG HÀ NỘI\n` +
        `📍 Thứ hạng: #${worldRanking.hanoiRanking.rank} toàn cầu\n` +
        `📊 AQI: ${worldRanking.hanoiRanking.aqi}\n` +
        `⚠️ Mức độ: ${worldRanking.hanoiRanking.pollutionLevel}\n\n`;
    }

    // Add most polluted city
    message2 +=
      `🏭 THÀNH PHỐ Ô NHIỄM NHẤT\n` +
      `📍 ${worldRanking.mostPolluted.city}, ${worldRanking.mostPolluted.country}\n` +
      `📊 AQI: ${worldRanking.mostPolluted.aqi}\n` +
      `⚠️ Mức độ: ${worldRanking.mostPolluted.pollutionLevel}\n\n`;

    // Add cleanest city
    message2 +=
      `🌿 THÀNH PHỐ SẠCH NHẤT\n` +
      `📍 ${worldRanking.cleanest.city}, ${worldRanking.cleanest.country}\n` +
      `📊 AQI: ${worldRanking.cleanest.aqi}\n` +
      `⚠️ Mức độ: ${worldRanking.cleanest.pollutionLevel}\n\n`;

    message1 += `⏰ Thời gian: ${new Date(pollution.ts).toLocaleString('vi-VN')}`;

    // Send message to specific user
    const chatId = 'ae3d13526a03835dda12';
    const result1 = await this.zaloBotService.sendMessage(chatId, message1);
    const result2 = await this.zaloBotService.sendMessage(chatId, message2);

    return {
      success: true,
      aqiData,
      worldRanking,
      message: [result1, result2],
    };
  }

  async sendHoroscope() {
    // Fetch horoscope data for Ngọ (Horse) zodiac
    const horoscopeData = await this.horoscopeService.getHoroscope({
      zodiacSign: VietnameseZodiac.NGO,
    });

    // Format message
    const { zodiacSign, date, generalInfo, indices, generalInterpretation, luckyNumbers } =
      horoscopeData;

    let message =
      `🔮 TỬ VI HẰNG NGÀY - ${zodiacSign.toUpperCase()}
` +
      `📅 Ngày: ${date}

` +
      `💫 ${generalInfo}

` +
      `📊 CHỈ SỐ:
` +
      `💼 Sự nghiệp: ${indices.career}/10
` +
      `💰 Tài lộc: ${indices.fortune}/10
` +
      `❤️ Tình cảm: ${indices.love}/10
` +
      `💪 Sức khỏe: ${indices.health}/10

`;

    if (luckyNumbers.length > 0) {
      message += `🍀 Con số may mắn: ${luckyNumbers.join(', ')}

`;
    }

    message += `📝 LUẬN GIẢI:
${generalInterpretation}`;

    // Send message to specific user
    const chatId = 'ae3d13526a03835dda12';
    const result = await this.zaloBotService.sendMessage(chatId, message);

    return {
      success: true,
      horoscopeData,
      message: result,
    };
  }

  async sendWordOfTheDay() {
    try {
      // Get word of the day with definition
      const wordInfo = await this.wordService.getWordInfo();

      // Format message for Zalo
      const message = this.formatWordForZalo(wordInfo);

      // Send message to specific user
      const chatId = 'ae3d13526a03835dda12';
      const result = await this.zaloBotService.sendMessage(chatId, message);

      return {
        success: true,
        wordInfo,
        message: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Format word information for Zalo message
   */
  private formatWordForZalo(wordInfo: {
    wordOfTheDay: { word: string; cambridgeUrl: string };
    definition: any[];
  }): string {
    const { wordOfTheDay, definition } = wordInfo;
    const firstDef = definition[0];

    if (!firstDef) {
      return `📚 Word: ${wordOfTheDay.word}\n\nNo definition found.`;
    }

    let message = `📚 WORD OF THE DAY\n\n`;
    message += `📖 Word: ${firstDef.word}\n`;

    if (firstDef.phonetic) {
      message += `🔊 Phonetic: ${firstDef.phonetic}\n`;
    }

    message += `\n`;

    // Add meanings (limit to first 2 for brevity)
    if (firstDef.meanings && firstDef.meanings.length > 0) {
      const meaningsToShow = firstDef.meanings.slice(0, 2);

      meaningsToShow.forEach((meaning, idx) => {
        message += `${idx + 1}. ${meaning.partOfSpeech.toUpperCase()}\n`;

        // Add first 2 definitions
        const defsToShow = meaning.definitions.slice(0, 2);
        defsToShow.forEach((def) => {
          message += `   • ${def.definition}\n`;
          if (def.example) {
            message += `     Example: "${def.example}"\n`;
          }
        });
        message += `\n`;
      });
    }

    message += `🔗 ${wordOfTheDay.cambridgeUrl}`;

    return message;
  }
}
