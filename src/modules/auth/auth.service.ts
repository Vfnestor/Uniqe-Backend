import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import {
  JwtService,
} from "@nestjs/jwt";

import {
  PrismaService,
} from "../../database/prisma.service";

import {
  compare,
  hash,
} from "bcrypt";

import type {
  LoginDto,
  RegisterDto,
} from "./dto";

import type {
  AuthResult,
  AuthenticatedUser,
} from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
      await hash(dto.password, 12);

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
      user.status !== "ACTIVE"
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

  private async createAuthResult(
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      avatarUrl: string | null;
      status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
      role: "USER" | "ADMIN";
      createdAt: Date;
      updatedAt: Date;
    },
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
          expiresIn: "15m",
        },
      );

    const refreshToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          type: "refresh",
        },
        {
          expiresIn: "30d",
        },
      );

    const authenticatedUser: AuthenticatedUser =
      this.removePassword(user);

    return {
      user: authenticatedUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  private removePassword(
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      avatarUrl: string | null;
      status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
      role: "USER" | "ADMIN";
      createdAt: Date;
      updatedAt: Date;
    },
  ): AuthenticatedUser {
    const {
      password: _password,
      ...safeUser
    } = user;

    return safeUser;
  }
}