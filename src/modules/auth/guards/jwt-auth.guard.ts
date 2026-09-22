import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import {
  JwtService,
} from "@nestjs/jwt";

import type {
  Request,
} from "express";

type JwtPayload = {
  sub: string;
  email?: string;
  role?: string;
  type?: string;
};

@Injectable()
export class JwtAuthGuard
  implements CanActivate
{
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request =
      context
        .switchToHttp()
        .getRequest<Request>();

    const authorization =
      request.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith(
        "Bearer ",
      )
    ) {
      throw new UnauthorizedException(
        "Authentication required.",
      );
    }

    const token =
      authorization.substring(7);

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(
          token,
          {
            secret:
              process.env
                .JWT_ACCESS_SECRET,
          },
        );

      if (
        payload.type !==
        "access"
      ) {
        throw new UnauthorizedException(
          "Invalid access token.",
        );
      }

      (
        request as Request & {
          user?: JwtPayload;
        }
      ).user = payload;

      return true;
    } catch {
      throw new UnauthorizedException(
        "Invalid or expired access token.",
      );
    }
  }
}