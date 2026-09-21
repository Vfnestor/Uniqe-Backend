import {
  Injectable,
} from "@nestjs/common";

import {
  PrismaService,
} from "../../database/prisma.service";

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async check() {
    let database =
      "disconnected";

    try {
      await this.prisma.$queryRaw<
        { result: number }[]
      >`SELECT 1`;

      database = "connected";
    } catch {
      database = "disconnected";
    }

    const status =
      database === "connected"
        ? "ok"
        : "degraded";

    return {
      status,
      service: "Uniqe Backend",
      version: "1.0.0",
      environment:
        process.env.NODE_ENV ||
        "development",
      database,
      timestamp:
        new Date().toISOString(),
    };
  }
}