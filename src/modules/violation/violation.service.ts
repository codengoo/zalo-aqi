import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { LookupMultipleViolationDto, MultipleViolationResponseDto } from './dto';

@Injectable()
export class ViolationService {
  private readonly logger = new Logger(ViolationService.name);
  private readonly API_URL = 'http://34.126.134.11:3001/violations/lookup/multiple';

  /**
   * Tra cứu vi phạm giao thông
   */
  async lookupViolations(
    lookupDto: LookupMultipleViolationDto,
  ): Promise<MultipleViolationResponseDto> {
    try {
      this.logger.log(`Tra cứu vi phạm cho ${lookupDto.plateNumbers.length} biển số`);

      const response = await axios.post<MultipleViolationResponseDto>(this.API_URL, lookupDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);

      this.logger.error('Lỗi khi tra cứu vi phạm:', error);
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        throw new HttpException(
          error.response?.data?.message?.join(', ') || 'Lỗi kết nối với API tra cứu',
        );
      }
      throw new HttpException(
        'Lỗi khi tra cứu vi phạm giao thông',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
