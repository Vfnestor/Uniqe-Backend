import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import {
  ConfigService,
} from "@nestjs/config";

import {
  JwtService,
} from "@nestjs/jwt";

import {
  randomUUID,
} from "crypto";

import {
  PrismaService,
} from "../../database/prisma.service";

import {
  compare,
  hash,
} from "bcrypt";

import type {
  User,
} from "@prisma/client";

import type {
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterDto,
} from "./dto";

import {
  AUTH_ACCESS_TOKEN_EXPIRES_IN,
  AUTH_REFRESH_TOKEN_EXPIRES_IN,
} from "./auth.constants";

import type {
  AuthResult,
  AuthenticatedUser,
  JwtRefreshPayload,
} from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<AuthResult> {
    const email =
      dto.email
        .trim()
        .toLowerCase();

    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        "Email is already registered.",
      );
    }

    const password =
      await hash(
        dto.password,
        12,
      );

    const user =
      await this.prisma.user.create({
        data: {
          name:
            dto.name.trim(),
          email,
          password,
          status: "ACTIVE",
          role: "USER",
        },
      });

    return this.createAuthResult(
      user,
    );
  }

  async login(
    dto: LoginDto,
  ): Promise<AuthResult> {
    const email =
      dto.email
        .trim()
        .toLowerCase();

    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    if (
      user.status !==
      "ACTIVE"
    ) {
      throw new UnauthorizedException(
        "User account is not active.",
      );
    }

    const passwordMatches =
      await compare(
        dto.password,
        user.password,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    return this.createAuthResult(
      user,
    );
  }

  async refresh(
    dto: RefreshTokenDto,
  ): Promise<AuthResult> {
    const refreshSecret =
      this.configService.getOrThrow<string>(
        "JWT_REFRESH_SECRET",
      );

    let payload:
      | JwtRefreshPayload
      | undefined;

    try {
      payload =
        await this.jwtService.verifyAsync<JwtRefreshPayload>(
          dto.refreshToken,
          {
            secret: refreshSecret,
          },
        );
    } catch {
      throw new UnauthorizedException(
        "Invalid or expired refresh token.",
      );
    }

    if (
      payload.type !==
        "refresh" ||
      !payload.sub ||
      !payload.jti
    ) {
      throw new UnauthorizedException(
        "Invalid refresh token.",
      );
    }

    const storedToken =
      await this.prisma.refreshToken.findUnique({
        where: {
          tokenId: payload.jti,
        },
        include: {
          user: true,
        },
      });

    if (
      !storedToken ||
      storedToken.revokedAt ||
      storedToken.expiresAt <=
        new Date()
    ) {
      throw new UnauthorizedException(
        "Refresh token is no longer valid.",
      );
    }

    const tokenMatches =
      await compare(
        dto.refreshToken,
        storedToken.tokenHash,
      );

    if (!tokenMatches) {
      throw new UnauthorizedException(
        "Refresh token is invalid.",
      );
    }

    if (
      storedToken.user.status !==
      "ACTIVE"
    ) {
      throw new UnauthorizedException(
        "User account is not active.",
      );
    }

    await this.prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        revokedAt:
          new Date(),
      },
    });

    return this.createAuthResult(
      storedToken.user,
    );
  }

  async getSession(
    userId: string,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (
      !user ||
      user.status !==
        "ACTIVE"
    ) {
      throw new UnauthorizedException(
        "User session is invalid.",
      );
    }

    return {
      authenticated: true,
      user:
        this.removePassword(
          user,
        ),
    };
  }

  async logout(
    dto: LogoutDto,
  ) {
    const refreshSecret =
      this.configService.getOrThrow<string>(
        "JWT_REFRESH_SECRET",
      );

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtRefreshPayload>(
          dto.refreshToken,
          {
            secret: refreshSecret,
          },
        );

      if (
        payload.type !==
          "refresh" ||
        !payload.jti
      ) {
        return {
          success: true,
        };
      }

      await this.prisma.refreshToken.updateMany({
        where: {
          tokenId: payload.jti,
          revokedAt: null,
        },
        data: {
          revokedAt:
            new Date(),
        },
      });
    } catch {
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  }

  private async createAuthResult(
    user: User,
  ): Promise<AuthResult> {
    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
          type: "access",
        },
        {
          secret:
            this.configService.getOrThrow<string>(
              "JWT_ACCESS_SECRET",
            ),
          expiresIn:
            AUTH_ACCESS_TOKEN_EXPIRES_IN,
        },
      );

    const tokenId =
      randomUUID();

    const refreshToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          type: "refresh",
          jti: tokenId,
        },
        {
          secret:
            this.configService.getOrThrow<string>(
              "JWT_REFRESH_SECRET",
            ),
          expiresIn:
            AUTH_REFRESH_TOKEN_EXPIRES_IN,
        },
      );

    const refreshTokenHash =
      await hash(
        refreshToken,
        12,
      );

    const expiresAt =
      new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
        30,
    );

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenId,
        tokenHash:
          refreshTokenHash,
        expiresAt,
      },
    });

    return {
      user:
        this.removePassword(
          user,
        ),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  private removePassword(
    user: User,
  ): AuthenticatedUser {
    const {
      password: _password,
      ...safeUser
    } = user;

    return safeUser;
  }
}