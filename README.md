# NestJS Minimal Project

Dự án NestJS cơ bản không có test, chỉ gồm những package cần thiết.

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Swagger API Documentation

Sau khi chạy ứng dụng, truy cập Swagger UI tại:

**http://localhost:3000/api**

Swagger cung cấp giao diện trực quan để:
- Xem tất cả endpoints có sẵn
- Test API trực tiếp trên trình duyệt
- Xem request/response schema
- Thử nghiệm với dữ liệu mẫu

## API Endpoints

### GET /bot-info
Lấy thông tin về bot (account name, type, etc.)

### POST /chat-me
Gửi tin nhắn đến người dùng qua Zalo Bot

**Request Body:**
```json
{
  "chatId": "user_chat_id",
  "text": "Xin chào từ bot!"
}
```

## Mô tả

Dự án này bao gồm:
- NestJS core dependencies
- TypeScript configuration
- Cấu trúc module cơ bản (AppModule, AppController, AppService)
- Zalo Bot integration module
- Swagger/OpenAPI documentation
- Server chạy trên port 3000

## Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
ZALO_BOT_TOKEN=your_bot_token_here
```

## Links

- Application: http://localhost:3000
- Swagger UI: http://localhost:3000/api
- Swagger JSON: http://localhost:3000/api-json
