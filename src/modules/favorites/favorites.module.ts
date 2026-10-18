import {
  Module,
} from "@nestjs/common";

import {
  DatabaseModule,
} from "../../database";

import {
  FavoritesController,
} from "./favorites.controller";

import {
  FavoritesService,
} from "./favorites.service";

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    FavoritesController,
  ],

  providers: [
    FavoritesService,
  ],

  exports: [
    FavoritesService,
  ],
})
export class FavoritesModule {}