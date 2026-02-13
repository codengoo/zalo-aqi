# Configuration Guide

Hướng dẫn cấu hình chi tiết cho dự án Zalo AQI Bot.

## Cấu trúc Configuration

### File Config Tập Trung

- **Location**: `src/config/app.config.ts`
- **Purpose**: Tập trung tất cả cấu hình ứng dụng ở một nơi
- **Benefits**:
  - Dễ maintain và update
  - Tránh hard-code values trong code
  - Hỗ trợ environment variables với default values

### Cách Sử Dụng

Tất cả các services sử dụng `ConfigService` từ `@nestjs/config` để lấy cấu hình:

```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {
  const apiUrl = this.configService.get<string>('api.aqi.baseUrl');
}
```

## Chi Tiết Cấu Hình

### 1. AQI Service Configuration

**Config Keys:**

- `api.aqi.baseUrl`: Base URL cho IQAir API
- `api.aqi.apiKey`: API key của IQAir (bắt buộc)
- `api.aqi.worldRankingUrl`: URL để crawl world ranking

**Environment Variables:**

```env
IQAIR_API_KEY=your_api_key_here
AQI_API_BASE_URL=https://api.airvisual.com/v2
AQI_WORLD_RANKING_URL=https://www.iqair.com/world-air-quality-ranking
```

**Defaults:**

- Base URL: `https://api.airvisual.com/v2`
- World Ranking URL: `https://www.iqair.com/world-air-quality-ranking`

---

### 2. Horoscope Service Configuration

**Config Keys:**

- `api.horoscope.baseUrl`: Base URL cho horoscope crawling

**Environment Variables:**

```env
HOROSCOPE_BASE_URL=https://thientue.vn/12-con-giap
```

**Defaults:**

- Base URL: `https://thientue.vn/12-con-giap`

---

### 3. Word Service Configuration

**Config Keys:**

- `api.word.cambridgeUrl`: Cambridge Dictionary URL
- `api.word.dictionaryApiUrl`: Dictionary API URL
- `api.word.randomWordApiUrl`: Random Word API URL

**Environment Variables:**

```env
CAMBRIDGE_URL=https://dictionary.cambridge.org
DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en
RANDOM_WORD_API_URL=https://random-word-api.herokuapp.com/word
```

**Defaults:**

- Cambridge URL: `https://dictionary.cambridge.org`
- Dictionary API: `https://api.dictionaryapi.dev/api/v2/entries/en`
- Random Word API: `https://random-word-api.herokuapp.com/word`

---

### 4. Violation Service Configuration

**Config Keys:**

- `api.violation.apiUrl`: API URL để tra cứu vi phạm giao thông

**Environment Variables:**

```env
VIOLATION_API_URL=http://34.126.134.11:3001/violations/lookup/multiple
```

**Defaults:**

- API URL: `http://34.126.134.11:3001/violations/lookup/multiple`

---

### 5. Webhook Service Configuration

**Config Keys:**

- `webhook.chatId`: Zalo Chat ID để gửi tin nhắn
- `webhook.defaultAqiCity`: Default city cho AQI lookup
- `webhook.defaultZodiac`: Default zodiac sign cho horoscope
- `webhook.defaultViolationPlateNumbers`: Default biển số xe cho violation lookup

**Environment Variables:**

```env
ZALO_CHAT_ID=ae3d13526a03835dda12
DEFAULT_AQI_CITY=Hanoi
DEFAULT_AQI_STATE=Ha Noi
DEFAULT_AQI_COUNTRY=Vietnam
DEFAULT_ZODIAC=NGO
DEFAULT_VIOLATION_PLATES=[{"plateNumber":"30E43807","vehicleType":"CAR"}]
```

**Defaults:**

- Chat ID: `ae3d13526a03835dda12`
- AQI City: Hanoi, Ha Noi, Vietnam
- Zodiac: NGO (Ngọ)
- Violation Plates: 2 default plate numbers

**Zodiac Options:**
`TY`, `SUU`, `DAN`, `MAO`, `THIN`, `TI`, `NGO`, `MUI`, `THAN`, `DAU`, `TUAT`, `HOI`

---

## Thêm Cấu Hình Mới

### Bước 1: Thêm vào app.config.ts

```typescript
export default () => ({
  // ... existing config
  newService: {
    apiUrl: process.env.NEW_SERVICE_API_URL || 'https://default-url.com',
    apiKey: process.env.NEW_SERVICE_API_KEY,
  },
});
```

### Bước 2: Thêm vào .env.example

```env
# New Service Configuration
NEW_SERVICE_API_URL=https://default-url.com
NEW_SERVICE_API_KEY=your_api_key_here
```

### Bước 3: Sử dụng trong Service

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('newService.apiUrl');
    this.apiKey = this.configService.get<string>('newService.apiKey');
  }
}
```

## Best Practices

1. **Luôn cung cấp default values** cho non-sensitive configs
2. **Không commit file .env** vào git (đã có trong .gitignore)
3. **Sử dụng .env.example** làm documentation
4. **Sensitive data** (API keys, tokens) nên được lấy từ env vars
5. **Validate configs** khi khởi động app nếu cần thiết

## Troubleshooting

### Config không được load?

- Kiểm tra file `.env` có tồn tại không
- Kiểm tra tên environment variable có đúng không
- Kiểm tra `ConfigModule.forRoot()` đã load config file chưa

### Giá trị undefined?

- Kiểm tra config key có đúng không (case-sensitive)
- Kiểm tra default value trong `app.config.ts`
- Kiểm tra ConfigService đã được inject vào constructor chưa
