import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AqiService } from './aqi.service';
import { GetCityDataDto } from './dto';

@ApiTags('AQI')
@Controller('aqi')
export class AqiController {
  constructor(private readonly aqiService: AqiService) {}

  @Get('city')
  @ApiOperation({
    summary: 'Lấy dữ liệu chất lượng không khí của thành phố cụ thể',
  })
  async getCityData(@Query() query: GetCityDataDto) {
    const data = await this.aqiService.getCityData(query);
    return data;
  }
}
