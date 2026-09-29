import {
  NotFoundException,
} from "@nestjs/common";

import {
  UsersService,
} from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  const prisma: any = {
    user: {
      findUnique:
        jest.fn(),
      update:
        jest.fn(),
    },
    userProfile: {
      findUnique:
        jest.fn(),
      upsert:
        jest.fn(),
    },
    userPreferences: {
      findUnique:
        jest.fn(),
      create:
        jest.fn(),
      upsert:
        jest.fn(),
    },
  };

  const user: any = {
    id: "user-1",
    name: "Test User",
    email: "test@example.com",
    password: "hashed",
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

  beforeEach(() => {
    jest.clearAllMocks();

    service =
      new UsersService(
        prisma,
      );
  });

  it("should get current user account", async () => {
    prisma.user.findUnique =
      jest.fn().mockResolvedValue({
        ...user,
        profile: null,
        preferences: null,
      });

    const result =
      await service.getMe(
        "user-1",
      );

    expect(
      prisma.user.findUnique,
    ).toHaveBeenCalledWith({
      where: {
        id: "user-1",
      },
      include: {
        profile: true,
        preferences: true,
      },
    });

    expect(
      result.user.id,
    ).toBe("user-1");

    expect(
      result.profile,
    ).toBeNull();

    expect(
      result.preferences,
    ).toBeNull();
  });

  it("should throw when user does not exist", async () => {
    prisma.user.findUnique =
      jest.fn().mockResolvedValue(
        null,
      );

    await expect(
      service.getMe(
        "missing-user",
      ),
    ).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should get profile", async () => {
    const profile: any = {
      id: "profile-1",
      userId: "user-1",
      displayName:
        "Test User",
      bio: null,
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

    prisma.userProfile.findUnique =
      jest.fn().mockResolvedValue(
        profile,
      );

    const result =
      await service.getProfile(
        "user-1",
      );

    expect(
      result.id,
    ).toBe("profile-1");

    expect(
      result.theme,
    ).toBe("system");
  });

  it("should throw when profile does not exist", async () => {
    prisma.userProfile.findUnique =
      jest.fn().mockResolvedValue(
        null,
      );

    await expect(
      service.getProfile(
        "user-1",
      ),
    ).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should create preferences when missing", async () => {
    prisma.userPreferences.findUnique =
      jest.fn().mockResolvedValue(
        null,
      );

    prisma.userPreferences.create =
      jest.fn().mockResolvedValue({
        id: "preferences-1",
        userId: "user-1",
        theme: "SYSTEM",
        language: "en",
        notificationsEnabled:
          true,
        createdAt:
          new Date(
            "2026-01-01T00:00:00.000Z",
          ),
        updatedAt:
          new Date(
            "2026-01-02T00:00:00.000Z",
          ),
      });

    const result =
      await service.getPreferences(
        "user-1",
      );

    expect(
      prisma.userPreferences.create,
    ).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
      },
    });

    expect(
      result.userId,
    ).toBe("user-1");
  });

  it("should update profile", async () => {
    prisma.user.findUnique =
      jest.fn().mockResolvedValue(
        user,
      );

    prisma.userProfile.upsert =
      jest.fn().mockResolvedValue({
        id: "profile-1",
        userId: "user-1",
        displayName:
          "Updated User",
        bio: "Updated bio",
        avatarUrl: null,
        language: "fa",
        theme: "DARK",
        createdAt:
          new Date(
            "2026-01-01T00:00:00.000Z",
          ),
        updatedAt:
          new Date(
            "2026-01-02T00:00:00.000Z",
          ),
      });

    const result =
      await service.updateProfile(
        "user-1",
        {
          displayName:
            " Updated User ",
          bio: " Updated bio ",
          language: " fa ",
          theme: "dark",
        },
      );

    expect(
      prisma.userProfile.upsert,
    ).toHaveBeenCalledWith({
      where: {
        userId: "user-1",
      },
      create: {
        userId: "user-1",
        displayName:
          "Updated User",
        bio: "Updated bio",
        avatarUrl: null,
        language: "fa",
        theme: "DARK",
      },
      update: {
        displayName:
          "Updated User",
        bio: "Updated bio",
        language: "fa",
        theme: "DARK",
      },
    });

    expect(
      result.theme,
    ).toBe("dark");
  });

  it("should reject profile update for missing user", async () => {
    prisma.user.findUnique =
      jest.fn().mockResolvedValue(
        null,
      );

    await expect(
      service.updateProfile(
        "missing-user",
        {
          displayName:
            "Test User",
        },
      ),
    ).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should update preferences", async () => {
    prisma.user.findUnique =
      jest.fn().mockResolvedValue(
        user,
      );

    prisma.userPreferences.upsert =
      jest.fn().mockResolvedValue({
        id: "preferences-1",
        userId: "user-1",
        theme: "LIGHT",
        language: "fa",
        notificationsEnabled:
          false,
        createdAt:
          new Date(
            "2026-01-01T00:00:00.000Z",
          ),
        updatedAt:
          new Date(
            "2026-01-02T00:00:00.000Z",
          ),
      });

    const result =
      await service.updatePreferences(
        "user-1",
        {
          theme: "LIGHT",
          language: " fa ",
          notificationsEnabled:
            false,
        },
      );

    expect(
      prisma.userPreferences.upsert,
    ).toHaveBeenCalled();

    expect(
      result.theme,
    ).toBe("light");

    expect(
      result.language,
    ).toBe("fa");

    expect(
      result.notificationsEnabled,
    ).toBe(false);
  });

  it("should update avatar", async () => {
    prisma.user.update =
      jest.fn().mockResolvedValue({
        ...user,
        avatarUrl:
          "https://example.com/avatar.png",
      });

    const result =
      await service.updateUserAvatar(
        "user-1",
        "https://example.com/avatar.png",
      );

    expect(
      prisma.user.update,
    ).toHaveBeenCalledWith({
      where: {
        id: "user-1",
      },
      data: {
        avatarUrl:
          "https://example.com/avatar.png",
      },
    });

    expect(
      result.avatarUrl,
    ).toBe(
      "https://example.com/avatar.png",
    );
  });
});