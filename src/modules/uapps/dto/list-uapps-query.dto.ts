import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

import {
  UAPP_ACCENTS,
  UAPP_PLATFORMS,
  UAPP_REVIEW_STATUSES,
  UAPP_SOURCES,
  UAPP_STATUSES,
  UAPP_TYPES,
  UAPPS_DEFAULT_LIMIT,
  UAPPS_DEFAULT_PAGE,
  UAPPS_MAX_LIMIT,
} from "../uapps.constants";

const toBoolean = ({ value }: { value: unknown }) => {
  if (value === "true" || value === true) {
    return true;
  }

  if (value === "false" || value === false) {
    return false;
  }

  return value;
};

export class ListUAppsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = UAPPS_DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(UAPPS_MAX_LIMIT)
  limit = UAPPS_DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_SOURCES))
  source?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_PLATFORMS))
  platform?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_TYPES))
  type?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_STATUSES))
  status?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_ACCENTS))
  accent?: string;

  @IsOptional()
  @IsIn(Object.values(UAPP_REVIEW_STATUSES))
  reviewStatus?: string;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  official?: boolean;
}