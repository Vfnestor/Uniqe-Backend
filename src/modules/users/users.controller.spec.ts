import {
  UsersController,
} from "./users.controller";

describe("UsersController", () => {
  let controller: UsersController;

  const usersService: any = {
    getMe:
      jest.fn(),
    getProfile:
      jest.fn(),
    updateProfile:
      jest.fn(),
    getPreferences:
      jest.fn(),
    updatePreferences:
      jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    controller =
      new UsersController(
        usersService,
      );
  });

  it("should get current user", async () => {
    usersService.getMe =
      jest
        .fn()
        .mockResolvedValue({
          user: {
            id: "user-1",
          },
        });

    const result =
      await controller.getMe({
        sub: "user-1",
      });

    expect(
      usersService.getMe,
    ).toHaveBeenCalledWith(
      "user-1",
    );

    expect(
      result.user.id,
    ).toBe("user-1");
  });

  it("should get profile", async () => {
    usersService.getProfile =
      jest
        .fn()
        .mockResolvedValue({
          id: "profile-1",
        });

    const result =
      await controller.getProfile({
        sub: "user-1",
      });

    expect(
      usersService.getProfile,
    ).toHaveBeenCalledWith(
      "user-1",
    );

    expect(
      result.id,
    ).toBe("profile-1");
  });

  it("should update profile", async () => {
    const dto = {
      displayName:
        "Updated User",
    };

    usersService.updateProfile =
      jest
        .fn()
        .mockResolvedValue({
          id: "profile-1",
        });

    await controller.updateProfile(
      {
        sub: "user-1",
      },
      dto,
    );

    expect(
      usersService.updateProfile,
    ).toHaveBeenCalledWith(
      "user-1",
      dto,
    );
  });

  it("should get preferences", async () => {
    usersService.getPreferences =
      jest
        .fn()
        .mockResolvedValue({
          id: "preferences-1",
        });

    const result =
      await controller.getPreferences({
        sub: "user-1",
      });

    expect(
      usersService.getPreferences,
    ).toHaveBeenCalledWith(
      "user-1",
    );

    expect(
      result.id,
    ).toBe("preferences-1");
  });

  it("should update preferences", async () => {
    const dto = {
      theme: "DARK",
      notificationsEnabled:
        false,
    };

    usersService.updatePreferences =
      jest
        .fn()
        .mockResolvedValue({
          id: "preferences-1",
        });

    await controller.updatePreferences(
      {
        sub: "user-1",
      },
      dto,
    );

    expect(
      usersService.updatePreferences,
    ).toHaveBeenCalledWith(
      "user-1",
      dto,
    );
  });
});