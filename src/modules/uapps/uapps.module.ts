import {
  Module,
} from "@nestjs/common";

import {
  UAppsController,
} from "./uapps.controller";

import {
  UAppsService,
} from "./uapps.service";

@Module({
  controllers: [
    UAppsController,
  ],

  providers: [
    UAppsService,
  ],

  exports: [
    UAppsService,
  ],
})
export class UAppsModule {}