import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { VietnameseZodiac } from '../interfaces';

export class GetHoroscopeDto {
  @ApiProperty({
    description: 'Con giáp cần tra cứu',
    enum: VietnameseZodiac,
    example: VietnameseZodiac.NGO,
  })
  @IsEnum(VietnameseZodiac)
  zodiacSign: VietnameseZodiac;
}
