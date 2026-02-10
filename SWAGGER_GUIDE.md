# Hướng dẫn sử dụng Swagger UI

## Truy cập Swagger

1. Khởi động server:
```bash
npm run start:dev
```

2. Mở trình duyệt và truy cập:
```
http://localhost:3000/api
```

## Sử dụng Swagger UI

### Test endpoint GET /bot-info

1. Click vào endpoint **GET /bot-info**
2. Click nút **"Try it out"**
3. Click nút **"Execute"**
4. Xem kết quả trong phần **Response body**

### Test endpoint POST /chat-me

1. Click vào endpoint **POST /chat-me**
2. Click nút **"Try it out"**
3. Sửa JSON trong **Request body**:
```json
{
  "chatId": "your_chat_id_here",
  "text": "Tin nhắn test từ Swagger"
}
```
4. Click nút **"Execute"**
5. Xem kết quả trong phần **Response body**

## Tính năng Swagger

### 🎯 Ưu điểm
- ✅ Test API trực tiếp trên trình duyệt
- ✅ Không cần Postman hay curl
- ✅ Tự động generate documentation từ code
- ✅ Hiển thị schema, types, và examples
- ✅ Dễ dàng copy/paste request/response

### 📋 Thông tin hiển thị
- **Request Parameters**: Các tham số đầu vào
- **Request Body**: Dữ liệu gửi lên (với example)
- **Responses**: Các response codes và schema
- **Models**: Định nghĩa các DTO classes

### 🔧 Tags
Các endpoint được nhóm theo tags:
- **default**: Endpoints cơ bản (health check)
- **bot**: Endpoints liên quan đến thông tin bot
- **chat**: Endpoints gửi tin nhắn

## Lưu ý

- Đảm bảo đã set `ZALO_BOT_TOKEN` trong file `.env`
- Swagger JSON spec có sẵn tại: http://localhost:3000/api-json
- Có thể import Swagger JSON vào Postman nếu cần

## Ví dụ Response

### Bot Info Response
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

### Send Message Response
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

## Mở rộng

Để thêm endpoint mới vào Swagger:

1. Thêm decorators trong controller:
```typescript
@ApiTags('your-tag')
@ApiOperation({ summary: 'Your endpoint description' })
@ApiResponse({ status: 200, description: 'Success response' })
```

2. Tạo DTO với ApiProperty:
```typescript
export class YourDto {
  @ApiProperty({ description: 'Field description', example: 'example value' })
  fieldName: string;
}
```

3. Swagger sẽ tự động update!
