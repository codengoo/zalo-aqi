import { Body, Controller, Get, Post, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DebugService } from "./debug.service";
import { SendMessageDto } from "src/modules/debug/dto";

@ApiTags("Debug Zalo Bot")

@Controller()
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get("bot-info")
  @ApiOperation({ summary: "Lấy thông tin bot" })
  async getBotInfo() {
    return await this.debugService.getMe();
  }

  @Post("chat-me")
  @ApiOperation({ summary: "Gửi tin nhắn đến người dùng" })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const { chatId, text } = sendMessageDto;
    return await this.debugService.sendMessage(chatId, text);
  }
}
