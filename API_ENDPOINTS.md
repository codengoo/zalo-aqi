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

## GET /aqi/city

Lấy dữ liệu chất lượng không khí của thành phố cụ thể từ IQAir API

**Query Parameters:**
- `city` (string, required) - Tên thành phố (ví dụ: "Los Angeles")
- `state` (string, required) - Tên bang/tiểu bang (ví dụ: "California")
- `country` (string, required) - Tên quốc gia (ví dụ: "USA")

**Response:**
```json
{
  "success": true,
  "message": "City data retrieved successfully",
  "data": {
    "city": "Los Angeles",
    "state": "California",
    "country": "USA",
    "location": {
      "type": "Point",
      "coordinates": [-118.2437, 34.0522]
    },
    "current": {
      "weather": {
        "ts": "2026-02-11T10:00:00.000Z",
        "tp": 25,
        "pr": 1013,
        "hu": 45,
        "ws": 5,
        "wd": 180,
        "ic": "01d",
        "heatIndex": 27
      },
      "pollution": {
        "ts": "2026-02-11T10:00:00.000Z",
        "aqius": 55,
        "mainus": "p2",
        "aqicn": 38,
        "maincn": "p2",
        "p2": {
          "conc": 13.3,
          "aqius": 55,
          "aqicn": 38
        }
      }
    }
  }
}
```

**Data Fields:**
- `aqius` - AQI value (US EPA standard)
- `aqicn` - AQI value (China MEP standard)
- `tp` - Temperature (°C)
- `pr` - Atmospheric pressure (hPa)
- `hu` - Humidity (%)
- `ws` - Wind speed (m/s)
- `wd` - Wind direction (degrees, N=0, E=90, S=180, W=270)
- `ic` - Weather icon code
- `heatIndex` - Apparent temperature (°C)
- `conc` - Pollutant concentration (µg/m³)
- `mainus` - Main pollutant (US standard)
- `maincn` - Main pollutant (China standard)

**cURL Example:**
```bash
curl "http://localhost:3000/aqi/city?city=Los%20Angeles&state=California&country=USA"
```

**Error Responses:**
- `400` - Missing required parameters
- `500` - API key not configured or IQAir API error

**Note:** Yêu cầu có `IQAIR_API_KEY` trong file `.env`. Đăng ký miễn phí tại: https://www.iqair.com/dashboard/api

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
