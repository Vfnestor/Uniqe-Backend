import type {
  User,
} from "@prisma/client";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthenticatedUser = Omit<
  User,
  "password"
>;

export type AuthResult = {
  user: AuthenticatedUser;
  tokens: AuthTokens;
};