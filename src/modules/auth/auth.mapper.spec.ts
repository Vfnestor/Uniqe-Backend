import {
  mapAuthUser,
} from "./auth.mapper";

describe("Auth Mapper", () => {
  const baseUser: any = {
    id: "user-1",
    name: "Test User",
    email:
      "test@example.com",
    password:
      "hashed-password",
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

  it("should map normal user", () => {
    const result =
      mapAuthUser(
        baseUser,
      );

    expect(result).toEqual({
      id: "user-1",
      name: "Test User",
      email:
        "test@example.com",
      role: "user",
      status: "active",
      avatarUrl: null,
      createdAt:
        "2026-01-01T00:00:00.000Z",
      updatedAt:
        "2026-01-02T00:00:00.000Z",
    });
  });

  it("should map admin to owner", () => {
    const result =
      mapAuthUser({
        ...baseUser,
        role: "ADMIN",
      });

    expect(
      result.role,
    ).toBe("owner");
  });

  it("should map suspended user", () => {
    const result =
      mapAuthUser({
        ...baseUser,
        status: "SUSPENDED",
      });

    expect(
      result.status,
    ).toBe("suspended");
  });

  it("should never expose password", () => {
    const result =
      mapAuthUser(
        baseUser,
      );

    expect(
      result,
    ).not.toHaveProperty(
      "password",
    );
  });
});