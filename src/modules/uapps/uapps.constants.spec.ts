import {
  UAPP_ACCENTS,
  UAPP_PLATFORMS,
  UAPP_REVIEW_STATUSES,
  UAPP_SOURCES,
  UAPP_STATUSES,
  UAPP_TYPES,
  UAPPS_DEFAULT_LIMIT,
  UAPPS_DEFAULT_PAGE,
  UAPPS_MAX_LIMIT,
  UAPPS_ROUTE,
} from "./uapps.constants";

describe("UApps Constants", () => {
  it("should define route", () => {
    expect(
      UAPPS_ROUTE,
    ).toBe("uapps");
  });

  it("should define pagination defaults", () => {
    expect(
      UAPPS_DEFAULT_PAGE,
    ).toBe(1);

    expect(
      UAPPS_DEFAULT_LIMIT,
    ).toBe(20);

    expect(
      UAPPS_MAX_LIMIT,
    ).toBe(100);
  });

  it("should define app sources", () => {
    expect(
      UAPP_SOURCES.UNIQE,
    ).toBe("uniqe");

    expect(
      UAPP_SOURCES.USER,
    ).toBe("user");

    expect(
      UAPP_SOURCES.GOOGLE_PLAY,
    ).toBe("google-play");

    expect(
      UAPP_SOURCES.APP_STORE,
    ).toBe("app-store");
  });

  it("should define platforms", () => {
    expect(
      UAPP_PLATFORMS.WEB,
    ).toBe("web");

    expect(
      UAPP_PLATFORMS.ANDROID,
    ).toBe("android");

    expect(
      UAPP_PLATFORMS.IOS,
    ).toBe("ios");
  });

  it("should define types, statuses and accents", () => {
    expect(
      UAPP_TYPES.WEB_APP,
    ).toBe("web-app");

    expect(
      UAPP_STATUSES.AVAILABLE,
    ).toBe("available");

    expect(
      UAPP_ACCENTS.PURPLE,
    ).toBe("purple");
  });

  it("should define review statuses", () => {
    expect(
      UAPP_REVIEW_STATUSES.DRAFT,
    ).toBe("draft");

    expect(
      UAPP_REVIEW_STATUSES.APPROVED,
    ).toBe("approved");

    expect(
      UAPP_REVIEW_STATUSES.REJECTED,
    ).toBe("rejected");
  });
});