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
  PermissionsGuard,
  RolesGuard,
} from "./guards";

import {
  RbacController,
} from "./rbac/rbac.controller";

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
  ],

  controllers: [
    AuthController,
    RbacController,
  ],

  providers: [
    AuthService,
    RolesGuard,
    PermissionsGuard,
  ],

  exports: [
    AuthService,
    RolesGuard,
    PermissionsGuard,
  ],
})
export class AuthModule {}