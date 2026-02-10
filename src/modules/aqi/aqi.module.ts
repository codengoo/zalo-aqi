import { Module } from '@nestjs/common';
import { AqiController } from './aqi.controller';
import { AqiService } from './aqi.service';

@Module({
  controllers: [AqiController],
  providers: [AqiService],
  exports: [AqiService],
})
export class AqiModule {}
