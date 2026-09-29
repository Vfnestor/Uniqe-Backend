import {
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import {
  ConfigService,
} from "@nestjs/config";

import {
  JwtService,
} from "@nestjs/jwt";

import {
  JwtAuthGuard,
} from "./jwt-auth.guard";

describe("JwtAuthGuard", () => {
  let guard: JwtAuthGuard;

  const jwtService = {
    verifyAsync:
      jest.fn(),
  } as unknown as JwtService;

  const configService = {
    getOrThrow:
      jest.fn(),
  } as unknown as ConfigService;

  beforeEach(() => {
    jest.clearAllMocks();

    configService.getOrThrow =
      jest
        .fn()
        .mockReturnValue(
          "test-access-secret",
        );

    guard =
      new JwtAuthGuard(
        jwtService,
        configService,
      );
  });

  function createContext(
    authorization?: string,
  ): ExecutionContext {
    const request: any = {
      headers: {},
    };

    if (
      authorization !==
      undefined
    ) {
      request.headers.authorization =
        authorization;
    }

    return {
      switchToHttp: () => ({
        getRequest: () =>
          request,
      }),
    } as unknown as ExecutionContext;
  }

  it("should reject missing authorization header", async () => {
    await expect(
      guard.canActivate(
        createContext(),
      ),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should reject non-bearer authorization", async () => {
    await expect(
      guard.canActivate(
        createContext(
          "Basic abc",
        ),
      ),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should reject empty bearer token", async () => {
    await expect(
      guard.canActivate(
        createContext(
          "Bearer ",
        ),
      ),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should accept a valid access token", async () => {
    const payload = {
      sub: "user-1",
      email:
        "user@example.com",
      role: "USER",
      type: "access" as const,
    };

    jwtService.verifyAsync =
      jest
        .fn()
        .mockResolvedValue(
          payload,
        );

    const context =
      createContext(
        "Bearer valid-token",
      );

    const result =
      await guard.canActivate(
        context,
      );

    expect(result).toBe(true);

    expect(
      jwtService.verifyAsync,
    ).toHaveBeenCalledWith(
      "valid-token",
      {
        secret:
          "test-access-secret",
      },
    );
  });

  it("should attach payload to request", async () => {
    const payload = {
      sub: "user-1",
      email:
        "user@example.com",
      role: "USER",
      type: "access" as const,
    };

    jwtService.verifyAsync =
      jest
        .fn()
        .mockResolvedValue(
          payload,
        );

    const context =
      createContext(
        "Bearer valid-token",
      );

    await guard.canActivate(
      context,
    );

    const request =
      context
        .switchToHttp()
        .getRequest<any>();

    expect(
      request.user,
    ).toEqual(payload);
  });

  it("should reject refresh token used as access token", async () => {
    jwtService.verifyAsync =
      jest
        .fn()
        .mockResolvedValue({
          sub: "user-1",
          type: "refresh",
          jti: "token-id",
        });

    await expect(
      guard.canActivate(
        createContext(
          "Bearer refresh-token",
        ),
      ),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should reject invalid token", async () => {
    jwtService.verifyAsync =
      jest
        .fn()
        .mockRejectedValue(
          new Error("invalid"),
        );

    await expect(
      guard.canActivate(
        createContext(
          "Bearer invalid-token",
        ),
      ),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });
});