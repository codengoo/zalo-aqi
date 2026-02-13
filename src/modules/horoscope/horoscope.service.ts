import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GetHoroscopeDto } from './dto';
import { HoroscopeData, VietnameseZodiac } from './interfaces';

@Injectable()
export class HoroscopeService {
  private readonly baseUrl: string;

  // Mapping từ enum sang URL path
  private readonly zodiacUrlMap: Record<VietnameseZodiac, string> = {
    [VietnameseZodiac.TY]: 'tuoi-ty',
    [VietnameseZodiac.SUU]: 'tuoi-suu',
    [VietnameseZodiac.DAN]: 'tuoi-dan',
    [VietnameseZodiac.MAO]: 'tuoi-mao',
    [VietnameseZodiac.THIN]: 'tuoi-thin',
    [VietnameseZodiac.TI]: 'tuoi-ti',
    [VietnameseZodiac.NGO]: 'tuoi-ngo',
    [VietnameseZodiac.MUI]: 'tuoi-mui',
    [VietnameseZodiac.THAN]: 'tuoi-than',
    [VietnameseZodiac.DAU]: 'tuoi-dau',
    [VietnameseZodiac.TUAT]: 'tuoi-tuat',
    [VietnameseZodiac.HOI]: 'tuoi-hoi',
  };

  private readonly zodiacNameMap: Record<VietnameseZodiac, string> = {
    [VietnameseZodiac.TY]: 'Tý',
    [VietnameseZodiac.SUU]: 'Sửu',
    [VietnameseZodiac.DAN]: 'Dần',
    [VietnameseZodiac.MAO]: 'Mão',
    [VietnameseZodiac.THIN]: 'Thìn',
    [VietnameseZodiac.TI]: 'Tỵ',
    [VietnameseZodiac.NGO]: 'Ngọ',
    [VietnameseZodiac.MUI]: 'Mùi',
    [VietnameseZodiac.THAN]: 'Thân',
    [VietnameseZodiac.DAU]: 'Dậu',
    [VietnameseZodiac.TUAT]: 'Tuất',
    [VietnameseZodiac.HOI]: 'Hợi',
  };

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('api.horoscope.baseUrl');
  }

  async getHoroscope(query: GetHoroscopeDto): Promise<HoroscopeData> {
    const { zodiacSign } = query;
    const urlPath = this.zodiacUrlMap[zodiacSign];
    const url = `${this.baseUrl}/${urlPath}.html`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);

      // Crawl thông tin chung (title hoặc heading chính)
      const generalInfo = this.extractGeneralInfo($);

      // Crawl các chỉ số
      const indices = this.extractIndices($);

      // Crawl luận giải chung
      const generalInterpretation = this.extractGeneralInterpretation($);

      // Crawl con số may mắn
      const luckyNumbers = this.extractLuckyNumbers($);

      const horoscopeData: HoroscopeData = {
        zodiacSign: this.zodiacNameMap[zodiacSign],
        date: new Date().toISOString().split('T')[0],
        generalInfo,
        indices,
        generalInterpretation,
        luckyNumbers,
      };

      return horoscopeData;
    } catch (error) {
      console.error('Error crawling horoscope data:', error);
      throw new BadRequestException(`Failed to fetch horoscope data for ${zodiacSign}`);
    }
  }

  private extractGeneralInfo($: cheerio.CheerioAPI): string {
    // Lấy text từ h3.title-con-giap
    const titleElement = $('h3.title-con-giap').first();
    if (titleElement.length > 0) {
      let text = titleElement.text().trim();
      // Xóa các ký tự đặc biệt ở đầu câu như "- ", "* ", "+ ", etc.
      text = text.replace(/^[-*+•►▪▫\s]+/, '').trim();
      return text;
    }
    return 'Không có thông tin';
  }

  private extractIndices($: cheerio.CheerioAPI): {
    career: number;
    fortune: number;
    health: number;
    love: number;
  } {
    const indices = {
      career: 0,
      fortune: 0,
      health: 0,
      love: 0,
    };

    // Mapping từ khóa sang key
    const keywordMap: Record<string, keyof typeof indices> = {
      'sự nghiệp': 'career',
      'tài lộc': 'fortune',
      'sức khỏe': 'health',
      'tình cảm': 'love',
    };

    // Tìm h3.title-con-giap và lấy các thẻ p ngay sau nó
    const titleElement = $('h3.title-con-giap').first();
    if (titleElement.length > 0) {
      const parentDiv = titleElement.parent();
      const pElements = parentDiv.find('p');

      pElements.each((_, elem) => {
        const pText = $(elem).text().toLowerCase();

        // Kiểm tra xem p có chứa từ khóa nào không
        for (const [keyword, key] of Object.entries(keywordMap)) {
          if (pText.includes(keyword)) {
            // Đếm số lượng ★ trong span
            const spanElement = $(elem).find('span');
            if (spanElement.length > 0) {
              const spanText = spanElement.text();
              const starCount = (spanText.match(/★/g) || []).length;
              indices[key] = starCount;
            }
            break;
          }
        }
      });
    }

    return indices;
  }

  private extractGeneralInterpretation($: cheerio.CheerioAPI): string {
    const interpretationTexts: string[] = [];

    // Tìm h3.title-con-giap và lấy các thẻ p trong cùng div
    const titleElement = $('h3.title-con-giap').first();
    if (titleElement.length > 0) {
      const parentDiv = titleElement.parent();
      const pElements = parentDiv.find('p');

      pElements.each((_, elem) => {
        const pText = $(elem).text().trim();

        // Nếu không phải paragraph chỉ số và có nội dung đủ dài, thì đó là luận giải
        if (pText.length > 30) {
          interpretationTexts.push(pText);
        }
      });
    }

    return interpretationTexts.length > 0
      ? interpretationTexts.join('\n\n')
      : 'Không có luận giải chi tiết';
  }

  private extractLuckyNumbers($: cheerio.CheerioAPI): number[] {
    const luckyNumbers: number[] = [];

    // Tìm thẻ h2 chứa text "Con số may mắn"
    const h2Elements = $('h2');
    h2Elements.each((_, h2Elem) => {
      const h2Text = $(h2Elem).text();
      if (h2Text.includes('Con số may mắn')) {
        // Tìm các thẻ p ngay sau h2 này
        const nextElements = $(h2Elem).nextAll('p');

        // Chỉ lấy từ thẻ p đầu tiên có chứa "Vậy số may mắn chung"
        nextElements.each((_, pElem) => {
          const text = $(pElem).text();

          // Chỉ xử lý thẻ p có chứa "Vậy số may mắn chung"
          if (text.includes('Vậy số may mắn chung')) {
            // Tách lấy phần sau dấu ":" để tránh lấy số trong ngày tháng
            const parts = text.split(':');
            if (parts.length > 1) {
              // Lấy phần sau dấu ":" cuối cùng
              const numbersText = parts[parts.length - 1];
              const matches = numbersText.match(/\d+/g);
              if (matches) {
                matches.forEach((match) => {
                  const num = parseInt(match, 10);
                  if (num >= 0 && num <= 99 && !luckyNumbers.includes(num)) {
                    luckyNumbers.push(num);
                  }
                });
              }
            }
            return false; // Dừng lại sau khi tìm thấy thẻ p đúng
          }
        });

        // Nếu đã tìm thấy, dừng lại
        if (luckyNumbers.length > 0) {
          return false; // break
        }
      }
    });

    return luckyNumbers.sort((a, b) => a - b);
  }
}
