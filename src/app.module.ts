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
  UAppsModule,
} from "./modules/uapps";

import {
  USchoolModule,
} from "./modules/uschool";

import {
  FavoritesModule,
} from "./modules/favorites/favorites.module";

import {
  NotificationsModule,
} from "./modules/notifications/notifications.module";

import {
  GlobalAuthGuard,
} from "./common/guards";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,

    HealthModule,

    AuthModule,

    UsersModule,

    UAppsModule,

    USchoolModule,

    FavoritesModule,

    NotificationsModule,
  ],

  providers: [
    {
      provide: APP_GUARD,

      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}