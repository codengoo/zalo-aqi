import { Injectable } from "@nestjs/common";
import { ZaloBotService } from "src/shared";

@Injectable()
export class DebugService {
  constructor(private readonly zaloBotService: ZaloBotService) {}

  /**
   * Lấy thông tin bot
   */
  async getMe() {
    try {
      const result = await this.zaloBotService.getMe();
      if (result.ok) {
        return {
          success: true,
          message: "Bot connected successfully",
          data: result.result,
        };
      } else {
        return {
          success: false,
          message: result.description || "Failed to connect",
          error_code: result.error_code,
        };
      }
    } catch (error) {
      console.error("❌ Failed to connect to bot:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Gửi tin nhắn với typing indicator
   */
  async sendMessage(chatId: string, text: string) {
    try {
      // Show typing indicator
      await this.zaloBotService.sendChatAction(chatId, "typing");

      // Wait a bit to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send actual message
      const result = await this.zaloBotService.sendMessage(chatId, text);

      if (result.ok) {
        return {
          success: true,
          message: "Message sent successfully",
          data: result.result,
        };
      } else {
        return {
          success: false,
          message: result.description || "Failed to send message",
          error_code: result.error_code,
        };
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
