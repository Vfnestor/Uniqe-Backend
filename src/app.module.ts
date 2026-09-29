import {
  Module,
} from "@nestjs/common";

import {
  ConfigModule,
} from "@nestjs/config";

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
})
export class AppModule {}