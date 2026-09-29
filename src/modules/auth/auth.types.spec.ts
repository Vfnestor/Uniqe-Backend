import type {
  AuthTokens,
  AuthUserResponse,
  JwtAccessPayload,
  JwtRefreshPayload,
} from "./auth.types";

describe("Auth Types", () => {
  it("should support access payload structure", () => {
    const payload: JwtAccessPayload = {
      sub: "user-1",
      email:
        "user@example.com",
      role: "USER",
      type: "access",
    };

    expect(
      payload.sub,
    ).toBe("user-1");

    expect(
      payload.type,
    ).toBe("access");
  });

  it("should support refresh payload structure", () => {
    const payload: JwtRefreshPayload = {
      sub: "user-1",
      type: "refresh",
      jti: "token-id",
    };

    expect(
      payload.jti,
    ).toBe("token-id");

    expect(
      payload.type,
    ).toBe("refresh");
  });

  it("should support auth token structure", () => {
    const tokens: AuthTokens = {
      accessToken:
        "access-token",
      refreshToken:
        "refresh-token",
    };

    expect(
      tokens.accessToken,
    ).toBeDefined();

    expect(
      tokens.refreshToken,
    ).toBeDefined();
  });

  it("should support auth user response structure", () => {
    const user: AuthUserResponse = {
      id: "user-1",
      name: "Test User",
      email:
        "user@example.com",
      role: "user",
      status: "active",
      avatarUrl: null,
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };

    expect(
      user.id,
    ).toBe("user-1");
  });
});