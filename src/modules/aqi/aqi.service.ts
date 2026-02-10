import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { GetCityDataDto } from './dto';
import { CityData } from './interfaces';

@Injectable()
export class AqiService {
  private readonly baseUrl = 'https://api.airvisual.com/v2';
  private readonly instance: AxiosInstance;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('IQAIR_API_KEY');
    this.instance = axios.create({
      baseURL: this.baseUrl,
      params: {
        key: apiKey,
      },
    });
  }

  async getCityData(query: GetCityDataDto): Promise<CityData> {
    const { city, state, country } = query;

    const response = await this.instance.get('/city', {
      params: {
        city,
        state,
        country,
      },
    });

    if (response.data.status !== 'success') {
      throw new BadRequestException(response.data?.data?.message || 'Failed to retrieve city data');
    }

    return response.data.data as CityData;
  }
}
