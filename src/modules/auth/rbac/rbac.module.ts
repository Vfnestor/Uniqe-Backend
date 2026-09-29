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
  JwtAuthGuard,
} from "../guards";

import {
  RbacController,
} from "./rbac.controller";

import {
  RbacService,
} from "./rbac.service";

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
    RbacController,
  ],

  providers: [
    RbacService,
    JwtAuthGuard,
  ],

  exports: [
    RbacService,
  ],
})
export class RbacModule {}