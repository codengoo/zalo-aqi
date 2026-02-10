/**
 * Zalo Bot API Types
 * Định nghĩa các interface và types cho Zalo Bot API
 */

/**
 * Response chuẩn từ Zalo Bot API
 */
export interface ZaloBotResponse<T = any> {
  ok: boolean;
  result?: T;
  description?: string;
  error_code?: number;
}

/**
 * Thông tin Bot
 */
export interface BotInfo {
  id: string;
  account_name: string;
  account_type: string;
  can_join_groups: boolean;
}

/**
 * Kết quả gửi tin nhắn
 */
export interface MessageResult {
  message_id: string;
  date: number;
}

/**
 * Thông tin Webhook
 */
export interface WebhookInfo {
  url: string;
  updated_at: number;
}

/**
 * Loại Chat Action
 */
export type ChatAction = "typing" | "upload_photo";

/**
 * Options cho ZaloBotModule
 */
export interface ZaloBotModuleOptions {
  botToken: string;
}
