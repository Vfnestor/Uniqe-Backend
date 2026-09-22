import type {
  User,
  UserPreferences,
  UserProfile,
} from "@prisma/client";

import type {
  UserAccountResponse,
  UserPreferencesResponse,
  UserProfileResponse,
  UserResponse,
} from "./users.types";

function mapStatus(
  status: User["status"],
): UserResponse["status"] {
  return status.toLowerCase() as UserResponse["status"];
}

function mapRole(
  role: User["role"],
): UserResponse["role"] {
  return role.toLowerCase() as UserResponse["role"];
}

function mapTheme(
  theme:
    | UserProfile["theme"]
    | UserPreferences["theme"],
): "system" | "light" | "dark" {
  return theme.toLowerCase() as
    | "system"
    | "light"
    | "dark";
}

export function mapUser(
  user: User,
): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    status: mapStatus(user.status),
    role: mapRole(user.role),
    createdAt:
      user.createdAt.toISOString(),
    updatedAt:
      user.updatedAt.toISOString(),
  };
}

export function mapProfile(
  profile: UserProfile,
): UserProfileResponse {
  return {
    id: profile.id,
    userId: profile.userId,
    displayName:
      profile.displayName,
    bio: profile.bio,
    avatarUrl:
      profile.avatarUrl,
    language:
      profile.language,
    theme: mapTheme(
      profile.theme,
    ),
    createdAt:
      profile.createdAt.toISOString(),
    updatedAt:
      profile.updatedAt.toISOString(),
  };
}

export function mapPreferences(
  preferences: UserPreferences,
): UserPreferencesResponse {
  return {
    id: preferences.id,
    userId: preferences.userId,
    theme: mapTheme(
      preferences.theme,
    ),
    language:
      preferences.language,
    notificationsEnabled:
      preferences.notificationsEnabled,
    createdAt:
      preferences.createdAt.toISOString(),
    updatedAt:
      preferences.updatedAt.toISOString(),
  };
}

export function mapAccount(
  user: User,
  profile: UserProfile | null,
  preferences:
    | UserPreferences
    | null,
): UserAccountResponse {
  return {
    user: mapUser(user),
    profile:
      profile
        ? mapProfile(profile)
        : null,
    preferences:
      preferences
        ? mapPreferences(
            preferences,
          )
        : null,
  };
}