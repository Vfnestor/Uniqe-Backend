import { Module } from "@nestjs/common";

import { USchoolController } from "./u-school.controller";
import { USchoolService } from "./u-school.service";

@Module({
  controllers: [USchoolController],
  providers: [USchoolService],
  exports: [USchoolService],
})
export class USchoolModule {}