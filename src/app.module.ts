import {
  Module,
} from "@nestjs/common";

import {
  ConfigModule,
} from "@nestjs/config";

import {
  APP_GUARD,
} from "@nestjs/core";

import {
  DatabaseModule,
} from "./database";

import {
  HealthModule,
} from "./modules/health";

import {
  AuthModule,
} from "./modules/auth";

import {
  UsersModule,
} from "./modules/users";

import {
  GlobalAuthGuard,
} from "./common/guards";

import {
  JwtAuthGuard,
} from "./modules/auth/guards";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,

    HealthModule,

    AuthModule,

    UsersModule,
  ],

  providers: [
    JwtAuthGuard,

    {
      provide:
        APP_GUARD,

      useClass:
        GlobalAuthGuard,
    },
  ],
})
export class AppModule {}