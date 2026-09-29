import {
  Controller,
  Get,
} from "@nestjs/common";

import {
  Public,
} from "../../common/decorators";

@Controller("health")
export class HealthController {
  @Get()
  @Public()
  check() {
    return {
      status: "ok",
      service:
        "Uniqe Backend",
      timestamp:
        new Date().toISOString(),
    };
  }
}