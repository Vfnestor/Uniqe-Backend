import type {
  User,
} from "@prisma/client";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthenticatedUser =
  Omit<User, "password">;

export type AuthResult = {
  user: AuthenticatedUser;
  tokens: AuthTokens;
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

export type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthSessionResponse = {
  authenticated: true;
  user: AuthUserResponse;
};