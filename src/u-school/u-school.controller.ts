import { Controller, Get } from "@nestjs/common";

import { USchoolService } from "./u-school.service";

@Controller("u-school")
export class USchoolController {
  constructor(private readonly uSchoolService: USchoolService) {}

  @Get("status")
  getStatus() {
    return this.uSchoolService.getStatus();
  }

  @Get("architecture")
  getArchitecture() {
    return this.uSchoolService.getArchitecture();
  }
}