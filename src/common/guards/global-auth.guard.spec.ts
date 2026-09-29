import {
  ExecutionContext,
} from "@nestjs/common";

import {
  Reflector,
} from "@nestjs/core";

import {
  GlobalAuthGuard,
} from "./global-auth.guard";

describe("GlobalAuthGuard", () => {
  let guard: GlobalAuthGuard;
  let reflector: Reflector;

  const jwtAuthGuard = {
    canActivate:
      jest.fn(),
  } as any;

  beforeEach(() => {
    reflector =
      new Reflector();

    jest.clearAllMocks();

    guard =
      new GlobalAuthGuard(
        reflector,
        jwtAuthGuard,
      );
  });

  const context =
    {} as ExecutionContext;

  it("should allow public routes", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue(true);

    expect(
      guard.canActivate(
        context,
      ),
    ).toBe(true);

    expect(
      jwtAuthGuard.canActivate,
    ).not.toHaveBeenCalled();
  });

  it("should delegate protected routes to JwtAuthGuard", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue(false);

    jwtAuthGuard.canActivate
      .mockReturnValue(true);

    expect(
      guard.canActivate(
        context,
      ),
    ).toBe(true);

    expect(
      jwtAuthGuard.canActivate,
    ).toHaveBeenCalledWith(
      context,
    );
  });
});