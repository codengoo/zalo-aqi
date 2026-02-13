import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetWordDto } from './dto';
import { WordService } from './word.service';

@ApiTags('Word')
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('word-of-the-day')
  @ApiOperation({ summary: 'Get Word of the Day from Cambridge Dictionary' })
  @ApiResponse({ status: 200, description: 'Word of the day retrieved successfully' })
  async getWordOfTheDay() {
    return this.wordService.getWordInfo();
  }

  @Get('definition')
  @ApiOperation({ summary: 'Get word definition from Dictionary API' })
  @ApiResponse({ status: 200, description: 'Word definition retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Word not found' })
  async getDefinition(@Query() query: GetWordDto) {
    const word = query.word || (await this.wordService.getRandomWord());
    return this.wordService.getWordDefinition(word);
  }
}
