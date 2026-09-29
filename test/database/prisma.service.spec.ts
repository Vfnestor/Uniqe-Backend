import {
  PrismaService,
} from "../../src/database/prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should connect on module initialization", async () => {
    const connectSpy = jest
      .spyOn(service, "$connect")
      .mockResolvedValue(undefined);

    await service.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("should disconnect on module destruction", async () => {
    const disconnectSpy = jest
      .spyOn(service, "$disconnect")
      .mockResolvedValue(undefined);

    await service.onModuleDestroy();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});