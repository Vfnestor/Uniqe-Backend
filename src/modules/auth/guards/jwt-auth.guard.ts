import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import {
  ConfigService,
} from "@nestjs/config";

import {
  JwtService,
} from "@nestjs/jwt";

import type {
  Request,
} from "express";

import type {
  JwtAccessPayload,
} from "../auth.types";

@Injectable()
export class JwtAuthGuard
  implements CanActivate
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request =
      context
        .switchToHttp()
        .getRequest<
          Request & {
            user?: JwtAccessPayload;
          }
        >();

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
      authorization
        .substring(7)
        .trim();

    if (!token) {
      throw new UnauthorizedException(
        "Authentication required.",
      );
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtAccessPayload>(
          token,
          {
            secret:
              this.configService.getOrThrow<string>(
                "JWT_ACCESS_SECRET",
              ),
          },
        );

      if (
        payload.type !==
          "access" ||
        !payload.sub
      ) {
        throw new UnauthorizedException(
          "Invalid access token.",
        );
      }

      request.user =
        payload;

      return true;
    } catch {
      throw new UnauthorizedException(
        "Invalid or expired access token.",
      );
    }
  }
}