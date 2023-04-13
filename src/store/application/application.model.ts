export interface App {
  user: User;
  loading: boolean;
  notification_token: string;
}

export interface User {
  id: number;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}