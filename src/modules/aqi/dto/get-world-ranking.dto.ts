import { ApiProperty } from '@nestjs/swagger';

export class CityRankingDto {
  @ApiProperty({ description: 'Thứ hạng của thành phố' })
  rank: number;

  @ApiProperty({ description: 'Tên thành phố' })
  city: string;

  @ApiProperty({ description: 'Quốc gia' })
  country: string;

  @ApiProperty({ description: 'Chỉ số AQI' })
  aqi: number;

  @ApiProperty({ description: 'Mức độ ô nhiễm' })
  pollutionLevel: string;

  @ApiProperty({ description: 'Số lượng followers' })
  followers: string;
}

export class WorldRankingResponseDto {
  @ApiProperty({ description: 'Thành phố ô nhiễm nhất', type: CityRankingDto })
  mostPolluted: CityRankingDto;

  @ApiProperty({ description: 'Thành phố sạch nhất', type: CityRankingDto })
  cleanest: CityRankingDto;

  @ApiProperty({
    description: 'Ranking của Hà Nội (nếu có)',
    type: CityRankingDto,
    nullable: true,
  })
  hanoiRanking: CityRankingDto | null;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: string;
}
