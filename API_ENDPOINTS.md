# API Endpoints

## 📚 Swagger Documentation

Để test API trực quan, truy cập Swagger UI:

**http://localhost:3000/api**

Swagger cung cấp:
- ✅ Giao diện test API tương tác
- ✅ Tự động điền dữ liệu mẫu
- ✅ Xem request/response schema
- ✅ Không cần công cụ bên ngoài như Postman

---

## GET /bot-info

Lấy thông tin về bot

**Response:**
```json
{
  "success": true,
  "message": "Bot connected successfully",
  "data": {
    "id": "1459232241454765289",
    "account_name": "bot.VDKyGxQvc",
    "account_type": "BASIC",
    "can_join_groups": false
  }
}
```

**cURL Example:**
```bash
curl http://localhost:3000/bot-info
```

---

## POST /chat-me

Gửi tin nhắn đến người dùng qua Zalo Bot

**Request Body:**
```json
{
  "chatId": "user_chat_id",
  "text": "Xin chào từ bot!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message_id": "82599fa32f56d00e8941",
    "date": 1749632637199
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/chat-me \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "your_chat_id",
    "text": "Hello from bot!"
  }'
```

---

## Chạy server

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Server sẽ chạy tại: http://localhost:3000

## Lưu ý

- Đảm bảo đã set biến môi trường `ZALO_BOT_TOKEN` trong file `.env`
- `chatId` là ID của người dùng hoặc cuộc trò chuyện trên Zalo
- Bot sẽ hiển thị trạng thái "đang gõ..." trong 1 giây trước khi gửi tin nhắn
