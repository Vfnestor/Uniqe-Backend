import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";

import {
  AuthService,
} from "./auth.service";

import {
  AdminLoginDto,
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterDto,
} from "./dto";

import {
  CurrentUser,
} from "./decorators";

import {
  JwtAuthGuard,
} from "./guards";

import {
  Public,
} from "../../common/decorators";

import type {
  JwtAccessPayload,
} from "./auth.types";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  @Public()
  async register(
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(
      dto,
    );
  }

  @Post("login")
  @Public()
  async login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(
      dto,
    );
  }

  /**
   * ورود اختصاصی مدیر.
   *
   * مسیر نهایی با global prefix:
   * POST /api/v1/auth/admin/login
   */
  @Post("admin/login")
  @Public()
  async loginAdmin(
    @Body() dto: AdminLoginDto,
  ) {
    return this.authService.loginAdmin(
      dto,
    );
  }

  @Post("refresh")
  @Public()
  async refresh(
    @Body() dto: RefreshTokenDto,
  ) {
    return this.authService.refresh(
      dto,
    );
  }

  @Get("session")
  @UseGuards(JwtAuthGuard)
  async session(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.authService.getSession(
      user.sub,
    );
  }

  @Post("logout")
  @Public()
  async logout(
    @Body() dto: LogoutDto,
  ) {
    return this.authService.logout(
      dto,
    );
  }
}