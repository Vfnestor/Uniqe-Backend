import {
  PrismaService,
} from "./prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(() => {
    service =
      Object.create(
        PrismaService.prototype,
      ) as PrismaService;

    (
      service as any
    ).$connect =
      jest.fn();

    (
      service as any
    ).$disconnect =
      jest.fn();
  });

  it("should connect on module init", async () => {
    await service.onModuleInit();

    expect(
      (
        service as any
      ).$connect,
    ).toHaveBeenCalledTimes(1);
  });

  it("should disconnect on module destroy", async () => {
    await service.onModuleDestroy();

    expect(
      (
        service as any
      ).$disconnect,
    ).toHaveBeenCalledTimes(1);
  });

  it("should expose PrismaService", () => {
    expect(
      service,
    ).toBeInstanceOf(
      PrismaService,
    );
  });
});