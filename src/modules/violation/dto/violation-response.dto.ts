import { ApiProperty } from '@nestjs/swagger';
import { VehicleType, ViolationInfo } from '../interfaces/violation.interface';

/**
 * DTO cho response tra cứu vi phạm của một biển số
 */
export class ViolationResponseDto {
  @ApiProperty({
    description: 'Trạng thái tra cứu',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Biển số xe được tra cứu',
    example: '30E43807',
  })
  plateNumber: string;

  @ApiProperty({
    description: 'Loại phương tiện',
    enum: VehicleType,
    example: VehicleType.CAR,
  })
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'Danh sách vi phạm (nếu có)',
    type: 'array',
    example: [],
  })
  data: ViolationInfo[];

  @ApiProperty({
    description: 'Thông báo lỗi (nếu có)',
    required: false,
    example: null,
  })
  message?: string;
}
