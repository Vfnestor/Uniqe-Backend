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

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  async register(
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(
      dto,
    );
  }

  @Post("login")
  async login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(
      dto,
    );
  }

  @Post("refresh")
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
    user: {
      sub: string;
    },
  ) {
    return this.authService.getSession(
      user.sub,
    );
  }

  @Post("logout")
  async logout(
    @Body() dto: LogoutDto,
  ) {
    return this.authService.logout(
      dto,
    );
  }
}