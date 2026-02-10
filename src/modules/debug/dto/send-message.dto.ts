import { ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
  @ApiProperty({
    description: 'ID của người nhận hoặc cuộc trò chuyện trên Zalo',
    example: 'ae3d13526a03835dda12',
  })
  chatId: string;

  @ApiProperty({
    description: 'Nội dung tin nhắn',
    example: 'Xin chào từ Zalo Bot!',
    minLength: 1,
    maxLength: 2000,
  })
  text: string;
}
