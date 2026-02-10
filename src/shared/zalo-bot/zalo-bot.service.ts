import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import {
  ZaloBotResponse,
  BotInfo,
  MessageResult,
  WebhookInfo,
  ChatAction,
} from "./zalo-bot.types";

@Injectable()
export class ZaloBotService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Kiểm tra Bot Token và lấy thông tin cơ bản về Bot
   * @returns Thông tin bot
   */
  async getMe(): Promise<ZaloBotResponse<BotInfo>> {
    try {
        console.log(this.httpService);
        
      const response = await firstValueFrom(this.httpService.post("getMe", {}));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get bot info: ${error.message}`);
    }
  }

  /**
   * Nhận tin nhắn mới bằng cơ chế long polling
   * @param timeout Thời gian timeout (giây), mặc định 30s
   * @returns Danh sách tin nhắn mới
   */
  async getUpdates(timeout: number = 30): Promise<ZaloBotResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("getUpdates", { timeout }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get updates: ${error.message}`);
    }
  }

  /**
   * Cấu hình Webhook URL
   * @param url URL nhận thông báo (HTTPS)
   * @param secretToken Khóa bí mật từ 8-256 ký tự
   * @returns Thông tin webhook đã cấu hình
   */
  async setWebhook(
    url: string,
    secretToken: string,
  ): Promise<ZaloBotResponse<WebhookInfo>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("setWebhook", {
          url,
          secret_token: secretToken,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set webhook: ${error.message}`);
    }
  }

  /**
   * Xóa cấu hình Webhook
   * @returns Kết quả xóa webhook
   */
  async deleteWebhook(): Promise<ZaloBotResponse<WebhookInfo>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("deleteWebhook", {}),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete webhook: ${error.message}`);
    }
  }

  /**
   * Lấy thông tin cấu hình Webhook hiện tại
   * @returns Thông tin webhook
   */
  async getWebhookInfo(): Promise<ZaloBotResponse<WebhookInfo>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("getWebhookInfo", {}),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get webhook info: ${error.message}`);
    }
  }

  /**
   * Gửi tin nhắn văn bản
   * @param chatId ID người nhận hoặc cuộc trò chuyện
   * @param text Nội dung tin nhắn (1-2000 ký tự)
   * @returns Thông tin tin nhắn đã gửi
   */
  async sendMessage(
    chatId: string,
    text: string,
  ): Promise<ZaloBotResponse<MessageResult>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("sendMessage", {
          chat_id: chatId,
          text,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  /**
   * Gửi tin nhắn hình ảnh
   * @param chatId ID người nhận hoặc cuộc trò chuyện
   * @param photo Đường dẫn hình ảnh
   * @param caption Nội dung văn bản đi kèm (tùy chọn)
   * @returns Thông tin tin nhắn đã gửi
   */
  async sendPhoto(
    chatId: string,
    photo: string,
    caption?: string,
  ): Promise<ZaloBotResponse<MessageResult>> {
    try {
      const payload: any = { chat_id: chatId, photo };
      if (caption) {
        payload.caption = caption;
      }
      const response = await firstValueFrom(
        this.httpService.post("sendPhoto", payload),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send photo: ${error.message}`);
    }
  }

  /**
   * Gửi tin nhắn sticker
   * @param chatId ID người nhận hoặc cuộc trò chuyện
   * @param sticker ID sticker từ https://stickers.zaloapp.com/
   * @returns Thông tin tin nhắn đã gửi
   */
  async sendSticker(
    chatId: string,
    sticker: string,
  ): Promise<ZaloBotResponse<MessageResult>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("sendSticker", {
          chat_id: chatId,
          sticker,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send sticker: ${error.message}`);
    }
  }

  /**
   * Gửi trạng thái chat action (ví dụ: đang gõ tin nhắn)
   * @param chatId ID người nhận hoặc cuộc trò chuyện
   * @param action Loại hành động: 'typing' hoặc 'upload_photo'
   * @returns Kết quả
   */
  async sendChatAction(
    chatId: string,
    action: ChatAction,
  ): Promise<ZaloBotResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post("sendChatAction", {
          chat_id: chatId,
          action,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send chat action: ${error.message}`);
    }
  }
}
