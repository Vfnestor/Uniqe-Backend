import type {
  User,
  UserPreferences,
  UserProfile,
} from "@prisma/client";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  status: "active" | "inactive" | "suspended";
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type UserProfileResponse = {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  language: string;
  theme: "system" | "light" | "dark";
  createdAt: string;
  updatedAt: string;
};

export type UserPreferencesResponse = {
  id: string;
  userId: string;
  theme: "system" | "light" | "dark";
  language: string;
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAccountResponse = {
  user: UserResponse;
  profile: UserProfileResponse | null;
  preferences: UserPreferencesResponse | null;
};

export type UserWithRelations = User & {
  profile: UserProfile | null;
  preferences: UserPreferences | null;
};