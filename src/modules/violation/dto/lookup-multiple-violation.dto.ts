import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { PlateNumberItem } from './plate-number-item.dto';

/**
 * DTO cho request tra cứu nhiều vi phạm
 */
export class LookupMultipleViolationDto {
  @ApiProperty({
    description: 'Danh sách biển số xe cần tra cứu (tối thiểu 1, tối đa 20)',
    type: [PlateNumberItem],
    example: [
      { plateNumber: '30E43807', vehicleType: 'car' },
      { plateNumber: '51F12345', vehicleType: 'motorbike' },
      { plateNumber: '29A98765', vehicleType: 'car' },
    ],
  })
  @IsArray({ message: 'Danh sách biển số phải là một mảng' })
  @ArrayMinSize(1, { message: 'Phải có ít nhất 1 biển số để tra cứu' })
  @ArrayMaxSize(20, { message: 'Chỉ được tra cứu tối đa 20 biển số cùng lúc' })
  @ValidateNested({ each: true })
  @Type(() => PlateNumberItem)
  plateNumbers: PlateNumberItem[];
}
