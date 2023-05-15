import {
  Invoice,
  StripeAccount,
  StripePayments,
  Transaction,
  Wallet,
} from "@store/payments/payments.model";
import { MatchMessage } from "@store/notifications/notifications.model";
import { Monster } from "@store/monsters/monsters.model";

export interface App {
  user: User;
  loading: boolean;
  notification_token: string;
  token: string;
}

export interface User extends BasicUser {
  Invoice: Invoice[];
  MatchMessage: MatchMessage[];
  Monster: Monster[];
  StripeAccount: StripeAccount[];
  Wallet: Wallet;
  transaction: Transaction[];
}

export interface BasicUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "MONSTER_OWNER";
  email_token: string;
  is_email_verified: boolean;
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

export interface MeResponse {
  invoices: Invoice[];
  stripeAccount: StripeAccount[];
  stripePayments: StripePayments[];
  transaction: Transaction[];
  wallet: Wallet[];
  user: BasicUser;
}
