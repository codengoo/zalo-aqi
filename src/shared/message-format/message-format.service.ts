import { Injectable } from '@nestjs/common';
import { MultipleViolationResponseDto } from '../../modules/violation/dto';

@Injectable()
export class MessageFormatService {
  /**
   * Format AQI data into Zalo messages
   */
  formatAqiMessages(aqiData: any, worldRanking: any): string[] {
    const { city, current } = aqiData;
    const { pollution, weather } = current;

    let message1 =
      `🌤️ Chất lượng không khí tại ${city}\n\n` +
      `📊 Chỉ số AQI: ${pollution.aqius} (US)\n` +
      `🌡️ Nhiệt độ: ${weather.tp}°C\n` +
      `💧 Độ ẩm: ${weather.hu}%\n` +
      `💨 Tốc độ gió: ${weather.ws} m/s\n` +
      `🧭 Hướng gió: ${weather.wd}°\n\n` +
      `⏰ Thời gian: ${new Date(pollution.ts).toLocaleString('vi-VN')}`;

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
      `⚠️ Mức độ: ${worldRanking.cleanest.pollutionLevel}`;

    return [message1, message2];
  }

  /**
   * Format horoscope data into Zalo message
   */
  formatHoroscopeMessage(horoscopeData: any): string {
    const { zodiacSign, date, generalInfo, indices, generalInterpretation, luckyNumbers } =
      horoscopeData;

    let message =
      `🔮 TỬ VI HẰNG NGÀY - ${zodiacSign.toUpperCase()}\n` +
      `📅 Ngày: ${date}\n\n` +
      `💫 ${generalInfo}\n\n` +
      `📊 CHỈ SỐ:\n` +
      `💼 Sự nghiệp: ${indices.career}/10\n` +
      `💰 Tài lộc: ${indices.fortune}/10\n` +
      `❤️ Tình cảm: ${indices.love}/10\n` +
      `💪 Sức khỏe: ${indices.health}/10\n\n`;

    if (luckyNumbers.length > 0) {
      message += `🍀 Con số may mắn: ${luckyNumbers.join(', ')}\n\n`;
    }

    message += `📝 LUẬN GIẢI:\n${generalInterpretation}`;

    return message;
  }

  /**
   * Format word of the day into Zalo message
   */
  formatWordMessage(wordInfo: {
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

  /**
   * Format violation data into separate Zalo messages (one per plate number)
   * Only shows unpaid violations
   */
  formatViolationMessages(data: MultipleViolationResponseDto): string[] {
    const messages: string[] = [];

    data.results.forEach((result) => {
      let message = `🚗 BIỂN SỐ: ${result.plateNumber} (${this.translateVehicleType(result.vehicleType)})\n`;

      if (!result.success) {
        message += `❌ Không thể tra cứu: ${result.message || 'Lỗi không xác định'}`;
        messages.push(message);
        return;
      }

      // Filter only unpaid violations (status contains "Chưa xử phạt")
      const unpaidViolations = result.data.filter(
        (v) => v.status && v.status.toLowerCase().includes('chưa xử phạt'),
      );

      if (unpaidViolations.length === 0) {
        message += `✅ Không có vi phạm chưa xử phạt`;
      } else {
        message += `⚠️ Có ${unpaidViolations.length} vi phạm chưa xử phạt:\n\n`;
        unpaidViolations.forEach((violation, vIndex) => {
          message += `${vIndex + 1}. ${violation.violationDetail.violationType}\n`;
          message += `   ⏰ Thời gian: ${violation.violationDetail.time}\n`;
          message += `   📍 Địa điểm: ${violation.violationDetail.location}\n`;
          message += `   📊 Trạng thái: ${violation.status}\n`;
          message += `   📞 Liên hệ: ${violation.processingUnit.phone}\n`;
          message += `   🏢 Đơn vị giải quyết: ${violation.processingUnit.resolvingUnit}\n`;
          if (vIndex < unpaidViolations.length - 1) {
            message += `\n`;
          }
        });
      }

      messages.push(message);
    });

    return messages;
  }

  /**
   * Translate vehicle type to Vietnamese
   */
  private translateVehicleType(type: string): string {
    const types = {
      car: 'Ô tô',
      motorbike: 'Xe máy',
      electricbike: 'Xe đạp điện',
    };
    return types[type] || type;
  }
}
