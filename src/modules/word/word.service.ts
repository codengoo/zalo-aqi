import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { WordDefinition, WordOfTheDay } from './interfaces';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);
  private readonly CAMBRIDGE_URL = 'https://dictionary.cambridge.org';
  private readonly DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
  private readonly RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Get random word from API
   */
  public async getRandomWord(): Promise<string> {
    this.logger.log('Fetching random word from API...');
    const response = await firstValueFrom(this.httpService.get<string[]>(this.RANDOM_WORD_API_URL));

    if (response.data && response.data.length > 0) {
      const word = response.data[0];
      this.logger.log(`Random word from API: ${word}`);
      return word;
    }
  }

  /**
   * Get word definition from Dictionary API
   */
  public async getWordDefinition(word: string): Promise<WordDefinition[]> {
    try {
      this.logger.log(`Fetching definition for word: ${word}`);

      const response = await firstValueFrom(
        this.httpService.get(`${this.DICTIONARY_API_URL}/${encodeURIComponent(word)}`),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching definition for ${word}:`, error.message);
      throw new Error(`Could not find definition for word: ${word}`);
    }
  }

  /**
   * Get complete word information (Word of the Day + Definition)
   */
  public async getWordInfo(): Promise<{
    wordOfTheDay: WordOfTheDay;
    definition: WordDefinition[];
  }> {
    const word = await this.getRandomWord();

    // Get word of the day if no word specified
    const wordOfTheDay: WordOfTheDay = {
      word: word,
      cambridgeUrl: `${this.CAMBRIDGE_URL}/dictionary/english/${word}`,
    };

    // Get definition from dictionary API
    const definition = await this.getWordDefinition(wordOfTheDay.word);

    return {
      wordOfTheDay,
      definition,
    };
  }
}
