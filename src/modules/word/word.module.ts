import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';

@Module({
  imports: [HttpModule],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
