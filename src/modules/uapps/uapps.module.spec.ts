import {
  UAppsController,
} from "./uapps.controller";

import {
  UAppsModule,
} from "./uapps.module";

import {
  UAppsService,
} from "./uapps.service";

describe("UAppsModule", () => {
  it("should be defined", () => {
    expect(
      UAppsModule,
    ).toBeDefined();
  });

  it("should register UAppsController", () => {
    const controllers =
      Reflect.getMetadata(
        "controllers",
        UAppsModule,
      );

    expect(
      controllers,
    ).toContain(
      UAppsController,
    );
  });

  it("should register UAppsService", () => {
    const providers =
      Reflect.getMetadata(
        "providers",
        UAppsModule,
      );

    expect(
      providers,
    ).toContain(
      UAppsService,
    );
  });

  it("should export UAppsService", () => {
    const exports =
      Reflect.getMetadata(
        "exports",
        UAppsModule,
      );

    expect(
      exports,
    ).toContain(
      UAppsService,
    );
  });
});