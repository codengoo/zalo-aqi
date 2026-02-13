import { Injectable } from '@nestjs/common';
import { MessageFormatService, ZaloBotService } from '../../shared';
import { AqiService } from '../aqi/aqi.service';
import { HoroscopeService } from '../horoscope/horoscope.service';
import { VietnameseZodiac } from '../horoscope/interfaces';
import { VehicleType } from '../violation/interfaces';
import { ViolationService } from '../violation/violation.service';
import { WordService } from '../word/word.service';

@Injectable()
export class WebhookService {
  private readonly CHAT_ID = 'ae3d13526a03835dda12';

  constructor(
    private readonly aqiService: AqiService,
    private readonly horoscopeService: HoroscopeService,
    private readonly wordService: WordService,
    private readonly violationService: ViolationService,
    private readonly messageFormatService: MessageFormatService,
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

    // Format messages
    const messages = this.messageFormatService.formatAqiMessages(aqiData, worldRanking);

    // Send messages to user sequentially
    const results = [];
    for (const message of messages) {
      const result = await this.zaloBotService.sendMessage(this.CHAT_ID, message);
      results.push(result);
    }

    return {
      success: true,
      aqiData,
      worldRanking,
      message: results,
    };
  }

  async sendHoroscope() {
    // Fetch horoscope data for Ngọ (Horse) zodiac
    const horoscopeData = await this.horoscopeService.getHoroscope({
      zodiacSign: VietnameseZodiac.NGO,
    });

    // Format message
    const message = this.messageFormatService.formatHoroscopeMessage(horoscopeData);

    // Send message to user
    const result = await this.zaloBotService.sendMessage(this.CHAT_ID, message);

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

      // Format message
      const message = this.messageFormatService.formatWordMessage(wordInfo);

      // Send message to user
      const result = await this.zaloBotService.sendMessage(this.CHAT_ID, message);

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

  async sendViolationLookup() {
    try {
      // Lookup violation
      const violationData = await this.violationService.lookupViolations({
        plateNumbers: [
          {
            plateNumber: '30E43807',
            vehicleType: VehicleType.CAR,
          },
          {
            plateNumber: '29Z67125',
            vehicleType: VehicleType.MOTORBIKE,
          },
        ],
      });

      // Format messages (one per plate number)
      const messages = this.messageFormatService.formatViolationMessages(violationData);

      // Send each message sequentially
      const results = [];
      for (const message of messages) {
        const result = await this.zaloBotService.sendMessage(this.CHAT_ID, message);
        results.push(result);
      }

      return {
        success: true,
        violationData,
        message: results,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
