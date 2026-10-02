import {
  Module,
} from "@nestjs/common";

import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";

import {
  JwtModule,
} from "@nestjs/jwt";

import {
  AuthController,
} from "./auth.controller";

import {
  AuthService,
} from "./auth.service";

import {
  JwtAuthGuard,
  PermissionsGuard,
  RolesGuard,
} from "./guards";

import {
  RbacModule,
} from "./rbac/rbac.module";

@Module({
  imports: [
    ConfigModule,

    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      inject: [
        ConfigService,
      ],
      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.getOrThrow<string>(
            "JWT_ACCESS_SECRET",
          ),
      }),
    }),

    RbacModule,
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtAuthGuard,
    RolesGuard,
    PermissionsGuard,
  ],

  exports: [
    AuthService,
    JwtAuthGuard,
    RolesGuard,
    PermissionsGuard,
    JwtModule,
  ],
})
export class AuthModule {}