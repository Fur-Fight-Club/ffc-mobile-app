import { Invoice, StripeAccount } from "@store/payments/payments.model";
import { MatchMessage } from "@store/notifications/notifications.model";
import { Monster } from "@store/monsters/monsters.model";
import { NotificationSettings } from "ffc-prisma-package/dist/client";

export interface App {
  user: User;
  loading: boolean;
  notification_token: string;
  token: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "MONSTER_OWNER";
  email_token: string;
  is_email_verified: boolean;
  Invoice: Invoice[];
  MatchMessage: MatchMessage[];
  Monster: Monster[];
  StripeAccount: StripeAccount[];
}

export class LoginRequest {
  email: string;
  password: string;
}

export class RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string;
}

export class UpsertNotificationTokenRequest {
  token: string;
  platform: "IOS" | "ANDROID" | "WEB";
}

export type UpsertNotificationTokenResponse = NotificationSettings;

export class DeleteNotificationTokenRequest {
  token: string;
}

export class UpdateTokenActiveStateRequest {
  token: string;
  active: boolean;
}
