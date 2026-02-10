# Environment Variables Configuration

## Setup

Chương trình đã được cấu hình để tự động load file `.env` khi khởi động.

### Cấu hình hiện tại:

- ✅ `@nestjs/config` đã được cài đặt
- ✅ `ConfigModule` đã được import vào `AppModule`
- ✅ `isGlobal: true` - Có thể sử dụng environment variables ở mọi nơi
- ✅ File `.env` sẽ được tự động load

### Environment Variables:

```env
ZALO_BOT_TOKEN=your_token_here
```

## Sử dụng Environment Variables

### 1. Trong code (sử dụng process.env)

```typescript
const botToken = process.env.ZALO_BOT_TOKEN;
```

### 2. Sử dụng ConfigService (recommended)

```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

getBotToken() {
  return this.configService.get<string>('ZALO_BOT_TOKEN');
}
```

## Lưu ý

- File `.env` cần ở thư mục gốc của project
- Restart server sau khi thay đổi `.env` file
- Không commit file `.env` vào git (đã có trong `.gitignore`)
- Sử dụng `.env.example` làm template

## Kiểm tra

Chạy server và kiểm tra console log:
```bash
npm run start:dev
```

Bot token sẽ được load tự động và ZaloBotModule sẽ sử dụng nó.
