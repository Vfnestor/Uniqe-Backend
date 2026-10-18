import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";

import { CurrentUser } from "../auth/decorators";
import { ActivityService } from "./activity.service";
import { ActivityQueryDto } from "./dto/activity-query.dto";

@Controller("activity")
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @Get()
  async list(
    @CurrentUser()
    user: { sub: string },
    @Query()
    query: ActivityQueryDto,
  ) {
    return this.activityService.list(
      user.sub,
      query,
    );
  }
}