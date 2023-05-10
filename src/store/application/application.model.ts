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
