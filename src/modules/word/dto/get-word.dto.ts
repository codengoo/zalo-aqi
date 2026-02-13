import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetWordDto {
  @ApiProperty({
    description: 'Word to look up (optional, defaults to Word of the Day)',
    example: 'serendipity',
    required: false,
  })
  @IsString()
  @IsOptional()
  word?: string;
}
