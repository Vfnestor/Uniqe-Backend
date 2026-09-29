import {
  mapAccount,
  mapPreferences,
  mapProfile,
  mapUser,
} from "./users.mapper";

describe("Users Mapper", () => {
  const user: any = {
    id: "user-1",
    name: "Test User",
    email: "test@example.com",
    password: "hashed-password",
    avatarUrl: null,
    status: "ACTIVE",
    role: "USER",
    createdAt:
      new Date(
        "2026-01-01T00:00:00.000Z",
      ),
    updatedAt:
      new Date(
        "2026-01-02T00:00:00.000Z",
      ),
  };

  const profile: any = {
    id: "profile-1",
    userId: "user-1",
    displayName: "Test User",
    bio: "Test bio",
    avatarUrl: null,
    language: "en",
    theme: "SYSTEM",
    createdAt:
      new Date(
        "2026-01-01T00:00:00.000Z",
      ),
    updatedAt:
      new Date(
        "2026-01-02T00:00:00.000Z",
      ),
  };

  const preferences: any = {
    id: "preferences-1",
    userId: "user-1",
    theme: "DARK",
    language: "fa",
    notificationsEnabled: true,
    createdAt:
      new Date(
        "2026-01-01T00:00:00.000Z",
      ),
    updatedAt:
      new Date(
        "2026-01-02T00:00:00.000Z",
      ),
  };

  it("should map user", () => {
    expect(
      mapUser(user),
    ).toEqual({
      id: "user-1",
      name: "Test User",
      email:
        "test@example.com",
      avatarUrl: null,
      status: "active",
      role: "user",
      createdAt:
        "2026-01-01T00:00:00.000Z",
      updatedAt:
        "2026-01-02T00:00:00.000Z",
    });
  });

  it("should map admin role", () => {
    expect(
      mapUser({
        ...user,
        role: "ADMIN",
      }).role,
    ).toBe("admin");
  });

  it("should map profile", () => {
    expect(
      mapProfile(profile),
    ).toEqual({
      id: "profile-1",
      userId: "user-1",
      displayName:
        "Test User",
      bio: "Test bio",
      avatarUrl: null,
      language: "en",
      theme: "system",
      createdAt:
        "2026-01-01T00:00:00.000Z",
      updatedAt:
        "2026-01-02T00:00:00.000Z",
    });
  });

  it("should map preferences", () => {
    expect(
      mapPreferences(
        preferences,
      ),
    ).toEqual({
      id: "preferences-1",
      userId: "user-1",
      theme: "dark",
      language: "fa",
      notificationsEnabled:
        true,
      createdAt:
        "2026-01-01T00:00:00.000Z",
      updatedAt:
        "2026-01-02T00:00:00.000Z",
    });
  });

  it("should map complete account", () => {
    expect(
      mapAccount(
        user,
        profile,
        preferences,
      ),
    ).toEqual({
      user: mapUser(user),
      profile:
        mapProfile(profile),
      preferences:
        mapPreferences(
          preferences,
        ),
    });
  });

  it("should support missing profile and preferences", () => {
    expect(
      mapAccount(
        user,
        null,
        null,
      ),
    ).toEqual({
      user: mapUser(user),
      profile: null,
      preferences: null,
    });
  });
});