import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { CityRankingDto, GetCityDataDto, WorldRankingResponseDto } from './dto';
import { CityData } from './interfaces';

@Injectable()
export class AqiService {
  private readonly worldRankingUrl: string;
  private readonly instance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.worldRankingUrl = this.configService.get<string>('api.aqi.worldRankingUrl');
    const baseUrl = this.configService.get<string>('api.aqi.baseUrl');
    const apiKey = this.configService.get<string>('api.aqi.apiKey');

    this.instance = axios.create({
      baseURL: baseUrl,
      params: {
        key: apiKey,
      },
    });
  }

  async getCityData(query: GetCityDataDto): Promise<CityData> {
    const { city, state, country } = query;

    try {
      const response = await this.instance.get('/city', {
        params: {
          city,
          state,
          country,
        },
      });

      if (response.data.status !== 'success') {
        throw new BadRequestException(
          response.data?.data?.message || 'Failed to retrieve city data',
        );
      }

      return response.data.data as CityData;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error.response.data);
      }
    }
  }

  private getAqiLevel(aqi: number): string {
    if (aqi <= 50) return 'Tốt (Good)';
    if (aqi <= 100) return 'Trung bình (Moderate)';
    if (aqi <= 150) return 'Không tốt cho nhóm nhạy cảm (Unhealthy for sensitive groups)';
    if (aqi <= 200) return 'Không tốt (Unhealthy)';
    if (aqi <= 300) return 'Rất không tốt (Very unhealthy)';
    return 'Nguy hại (Hazardous)';
  }

  async getWorldRanking(): Promise<WorldRankingResponseDto> {
    try {
      const response = await axios.get(this.worldRankingUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);
      const cities: CityRankingDto[] = [];

      // Parse the ranking table - adjust selectors based on actual HTML structure
      $('table tbody tr, table tr').each((index, element) => {
        const $row = $(element);
        const cells = $row.find('td');

        if (cells.length >= 3) {
          // Get text from cells
          const rankText = cells.eq(0).text().trim();
          const cityText = cells.eq(1).text().trim();
          const aqiText = cells.eq(2).text().trim();
          const followersText = cells.length > 3 ? cells.eq(3).text().trim() : '';

          // Parse rank
          const rank = parseInt(rankText, 10) || index + 1;

          // Extract city and country from text
          // Expected format: "Delhi, India" or "flag Delhi, India"
          const cleanedCityText = cityText.replace(/^flag\s+/, '').trim();
          const parts = cleanedCityText.split(',').map((s) => s.trim());

          if (parts.length >= 2) {
            const city = parts[0];
            const country = parts.slice(1).join(', ');
            const aqi = parseInt(aqiText, 10);

            if (!isNaN(aqi) && city && country) {
              cities.push({
                rank,
                city,
                country,
                aqi,
                pollutionLevel: this.getAqiLevel(aqi),
                followers: followersText || 'N/A',
              });
            }
          }
        }
      });

      if (cities.length === 0) {
        throw new BadRequestException('No city data found in the ranking table');
      }

      // Find most polluted (highest AQI)
      const mostPolluted = cities.reduce((max, city) => (city.aqi > max.aqi ? city : max));

      // Find cleanest (lowest AQI)
      const cleanest = cities.reduce((min, city) => (city.aqi < min.aqi ? city : min));

      // Find Hanoi
      const hanoiRanking = cities.find(
        (city) =>
          city.city.toLowerCase().includes('hanoi') ||
          city.city.toLowerCase().includes('hà nội') ||
          city.city.toLowerCase().includes('ha noi'),
      );

      return {
        mostPolluted,
        cleanest,
        hanoiRanking: hanoiRanking || null,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching world ranking:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch world air quality ranking');
    }
  }
}
