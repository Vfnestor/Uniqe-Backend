import type {
  User,
} from "@prisma/client";

export type AuthUserRole =
  | "user"
  | "owner";

export type AuthUserStatus =
  | "active"
  | "inactive"
  | "suspended";

export type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
  status: AuthUserStatus;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResult = {
  user: AuthUserResponse;
  tokens: AuthTokens;
};

export type AuthSessionResponse = {
  authenticated: true;
  user: AuthUserResponse;
};

export type JwtAccessPayload = {
  sub: string;
  email: string;
  role: string;
  type: "access";
};

export type JwtRefreshPayload = {
  sub: string;
  type: "refresh";
  jti: string;
};

export type AuthenticatedUser =
  Omit<User, "password">;