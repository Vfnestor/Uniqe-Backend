import {
  IsInt,
  IsOptional,
  Max,
  Min,
} from "class-validator";

import { Type } from "class-transformer";

export class ActivityQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}