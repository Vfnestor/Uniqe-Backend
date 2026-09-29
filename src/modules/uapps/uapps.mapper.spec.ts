import {
  mapUApp,
} from "./uapps.mapper";

describe("mapUApp", () => {
  it("should map a complete UApp", () => {
    const app: any = {
      id: "app-1",
      name: "Iran Gold AI",
      description:
        "Gold analysis application",
      category: "Finance",
      source: "UNIQE",
      sourceLabel: "Uniqe",
      platform: "WEB",
      platformLabel: "Web",
      type: "WEB_APP",
      typeLabel: "Web App",
      status: "AVAILABLE",
      statusLabel: "Available",
      icon: "gold-icon",
      cover: "gold-cover",
      accent: "PURPLE",
      href: "/uapps/iran-gold-ai",
      featured: true,
      verified: true,
      version: "1.0.0",
      official: true,
      releaseLabel: "Stable",
      productCode: "UGOLD",
      releaseStatus: "STABLE",
      reviewStatus: "APPROVED",
      rejectionReason: null,
      metadata: {
        category: "finance",
      },
      creator: {
        id: "user-1",
        name: "Vahid",
      },
      createdAt:
        new Date(
          "2026-01-01T00:00:00.000Z",
        ),
      updatedAt:
        new Date(
          "2026-01-02T00:00:00.000Z",
        ),
    };

    const result =
      mapUApp(app);

    expect(result).toEqual({
      id: "app-1",
      name: "Iran Gold AI",
      description:
        "Gold analysis application",
      category: "Finance",
      source: "uniqe",
      sourceLabel: "Uniqe",
      platform: "web",
      platformLabel: "Web",
      type: "web-app",
      typeLabel: "Web App",
      status: "available",
      statusLabel: "Available",
      icon: "gold-icon",
      cover: "gold-cover",
      accent: "purple",
      href: "/uapps/iran-gold-ai",
      featured: true,
      verified: true,
      version: "1.0.0",
      official: true,
      releaseLabel: "Stable",
      productCode: "UGOLD",
      releaseStatus: "stable",
      reviewStatus: "approved",
      rejectionReason: null,
      creator: {
        id: "user-1",
        name: "Vahid",
      },
      metadata: {
        category: "finance",
      },
      createdAt:
        "2026-01-01T00:00:00.000Z",
      updatedAt:
        "2026-01-02T00:00:00.000Z",
    });
  });

  it("should map missing optional values to null", () => {
    const app: any = {
      id: "app-2",
      name: "Test App",
      description: "Test",
      category: "Tools",
      source: "USER",
      sourceLabel: "User",
      platform: "ANDROID",
      platformLabel: "Android",
      type: "INSTALLABLE",
      typeLabel: "Installable",
      status: "DEVELOPMENT",
      statusLabel: "Development",
      icon: "icon",
      cover: null,
      accent: "BLUE",
      href: "/test",
      featured: false,
      verified: false,
      version: null,
      official: false,
      releaseLabel: null,
      productCode: null,
      releaseStatus: null,
      reviewStatus: "DRAFT",
      rejectionReason: null,
      metadata: null,
      creator: null,
      createdAt:
        new Date(
          "2026-01-01T00:00:00.000Z",
        ),
      updatedAt:
        new Date(
          "2026-01-01T00:00:00.000Z",
        ),
    };

    const result =
      mapUApp(app);

    expect(
      result.cover,
    ).toBeNull();

    expect(
      result.creator,
    ).toBeNull();

    expect(
      result.releaseStatus,
    ).toBeNull();

    expect(
      result.productCode,
    ).toBeNull();
  });
});