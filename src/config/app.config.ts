import { VietnameseZodiac } from 'src/modules/horoscope/interfaces';

export default () => ({
  // API Endpoints
  api: {
    aqi: {
      baseUrl: 'https://api.airvisual.com/v2',
      apiKey: process.env.IQAIR_API_KEY,
      worldRankingUrl: 'https://www.iqair.com/world-air-quality-ranking',
    },
    horoscope: {
      baseUrl: 'https://thientue.vn/12-con-giap',
    },
    word: {
      cambridgeUrl: 'https://dictionary.cambridge.org',
      dictionaryApiUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en',
      randomWordApiUrl: 'https://random-word-api.herokuapp.com/word',
    },
    violation: {
      apiUrl: 'http://34.126.134.11:3001/violations/lookup/multiple',
    },
  },

  // Webhook Settings
  webhook: {
    chatId: 'ae3d13526a03835dda12',
    defaultAqiCity: {
      city: 'Hanoi',
      state: 'Ha Noi',
      country: 'Vietnam',
    },
    defaultZodiac: VietnameseZodiac.NGO,
    defaultViolationPlateNumbers: [
      {
        plateNumber: '30E43807',
        vehicleType: 'CAR',
      },
      {
        plateNumber: '29Z67125',
        vehicleType: 'MOTORBIKE',
      },
    ],
  },
});
