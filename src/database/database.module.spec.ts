import {
  Test,
  TestingModule,
} from "@nestjs/testing";

import {
  DatabaseModule,
} from "./database.module";

import {
  PrismaService,
} from "./prisma.service";

describe("DatabaseModule", () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: jest
          .fn()
          .mockResolvedValue(undefined),

        $disconnect: jest
          .fn()
          .mockResolvedValue(undefined),
      })
      .compile();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it("should compile successfully", () => {
    expect(moduleRef).toBeDefined();
  });

  it("should provide PrismaService", () => {
    const prisma = moduleRef.get(
      PrismaService,
    );

    expect(prisma).toBeDefined();
  });
});