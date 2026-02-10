import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
