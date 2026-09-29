import {
  DatabaseModule,
} from "./database.module";

import {
  PrismaService,
} from "./prisma.service";

describe("DatabaseModule", () => {
  it("should be defined", () => {
    expect(
      DatabaseModule,
    ).toBeDefined();
  });

  it("should be a global module", () => {
    const metadata =
      Reflect.getMetadata(
        "global",
        DatabaseModule,
      );

    expect(
      metadata,
    ).toBe(true);
  });

  it("should provide PrismaService", () => {
    const metadata =
      Reflect.getMetadata(
        "providers",
        DatabaseModule,
      );

    expect(
      metadata,
    ).toContain(
      PrismaService,
    );
  });

  it("should export PrismaService", () => {
    const metadata =
      Reflect.getMetadata(
        "exports",
        DatabaseModule,
      );

    expect(
      metadata,
    ).toContain(
      PrismaService,
    );
  });
});