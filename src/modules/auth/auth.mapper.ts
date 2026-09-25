import type {
  User,
} from "@prisma/client";

import type {
  AuthUserResponse,
} from "./auth.types";

export function mapAuthUser(
  user: User,
): AuthUserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role:
      user.role === "ADMIN"
        ? "owner"
        : "user",
    status:
      user.status === "ACTIVE"
        ? "active"
        : user.status === "SUSPENDED"
          ? "suspended"
          : "inactive",
    avatarUrl:
      user.avatarUrl,
    createdAt:
      user.createdAt.toISOString(),
    updatedAt:
      user.updatedAt.toISOString(),
  };
}