import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetHoroscopeDto } from './dto';
import { HoroscopeService } from './horoscope.service';

@ApiTags('Horoscope')
@Controller('horoscope')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy thông tin tử vi hằng ngày theo con giáp',
    description:
      'Crawl dữ liệu từ thientue.vn bao gồm: thông tin chung, các chỉ số (sự nghiệp, tài lộc, sức khỏe, tình cảm), luận giải chung và con số may mắn',
  })
  async getHoroscope(@Query() query: GetHoroscopeDto) {
    return await this.horoscopeService.getHoroscope(query);
  }
}
