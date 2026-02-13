import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LookupMultipleViolationDto, MultipleViolationResponseDto } from './dto';
import { ViolationService } from './violation.service';

@ApiTags('Violation')
@Controller('violation')
export class ViolationController {
  constructor(private readonly violationService: ViolationService) {}

  @Post('lookup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tra cứu vi phạm giao thông theo biển số' })
  @ApiResponse({
    status: 200,
    description: 'Tra cứu thành công',
    type: MultipleViolationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @ApiResponse({
    status: 502,
    description: 'Lỗi kết nối với API tra cứu',
  })
  async lookupViolations(
    @Body() lookupDto: LookupMultipleViolationDto,
  ): Promise<MultipleViolationResponseDto> {
    return this.violationService.lookupViolations(lookupDto);
  }
}
