import { Module } from '@nestjs/common';
import { MessageFormatService } from './message-format.service';

@Module({
  providers: [MessageFormatService],
  exports: [MessageFormatService],
})
export class MessageFormatModule {}
