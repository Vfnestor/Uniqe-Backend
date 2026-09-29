import {
  UAppsModule,
  UAppsService,
  UAPPS_ROUTE,
} from "./index";

describe("UApps Barrel", () => {
  it("should export UAppsModule", () => {
    expect(
      UAppsModule,
    ).toBeDefined();
  });

  it("should export UAppsService", () => {
    expect(
      UAppsService,
    ).toBeDefined();
  });

  it("should export UApps constants", () => {
    expect(
      UAPPS_ROUTE,
    ).toBe("uapps");
  });
});