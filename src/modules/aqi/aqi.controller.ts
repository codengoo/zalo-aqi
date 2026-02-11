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

  @Get('world-ranking')
  @ApiOperation({
    summary: 'Lấy ranking chất lượng không khí toàn cầu',
    description: 'Trả về thành phố ô nhiễm nhất, sạch nhất và vị trí của Hà Nội (nếu có)',
  })
  async getWorldRanking() {
    return await this.aqiService.getWorldRanking();
  }
}
