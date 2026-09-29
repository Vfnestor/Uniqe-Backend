import type {
  UserAccountResponse,
  UserPreferencesResponse,
  UserProfileResponse,
  UserResponse,
} from "./users.types";

describe("Users Types", () => {
  it("should support user response", () => {
    const user: UserResponse = {
      id: "user-1",
      name: "Test User",
      email:
        "test@example.com",
      avatarUrl: null,
      status: "active",
      role: "user",
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };

    expect(
      user.id,
    ).toBe("user-1");
  });

  it("should support profile response", () => {
    const profile: UserProfileResponse = {
      id: "profile-1",
      userId: "user-1",
      displayName:
        "Test User",
      bio: null,
      avatarUrl: null,
      language: "en",
      theme: "system",
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };

    expect(
      profile.userId,
    ).toBe("user-1");
  });

  it("should support preferences response", () => {
    const preferences: UserPreferencesResponse = {
      id: "preferences-1",
      userId: "user-1",
      theme: "dark",
      language: "fa",
      notificationsEnabled:
        true,
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };

    expect(
      preferences.theme,
    ).toBe("dark");
  });

  it("should support account response", () => {
    const account: UserAccountResponse = {
      user: {
        id: "user-1",
        name: "Test User",
        email:
          "test@example.com",
        avatarUrl: null,
        status: "active",
        role: "user",
        createdAt:
          new Date().toISOString(),
        updatedAt:
          new Date().toISOString(),
      },
      profile: null,
      preferences: null,
    };

    expect(
      account.user.id,
    ).toBe("user-1");

    expect(
      account.profile,
    ).toBeNull();

    expect(
      account.preferences,
    ).toBeNull();
  });
});