import {
  Controller,
  Get,
} from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "Uniqe Backend",
      version: "1.0.0",
      environment:
        process.env.NODE_ENV ||
        "development",
      timestamp:
        new Date().toISOString(),
    };
  }
}