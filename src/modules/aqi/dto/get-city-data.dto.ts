import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCityDataDto {
  @ApiProperty({
    description: 'Tên thành phố',
    example: 'Los Angeles',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Tên bang/tiểu bang',
    example: 'California',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'Tên quốc gia',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}

// Response DTOs
export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface PollutantDetails {
  conc: number;
  aqius: number;
  aqicn: number;
}

export interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
  p1?: PollutantDetails;
  p2?: PollutantDetails;
  o3?: PollutantDetails;
  n2?: PollutantDetails;
  s2?: PollutantDetails;
  co?: PollutantDetails;
}

export interface Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
  heatIndex?: number;
}

export interface Current {
  weather: Weather;
  pollution: Pollution;
}

export interface CityData {
  city: string;
  state: string;
  country: string;
  location: Location;
  current: Current;
}

export interface IQAirApiResponse {
  status: string;
  data: CityData;
}
