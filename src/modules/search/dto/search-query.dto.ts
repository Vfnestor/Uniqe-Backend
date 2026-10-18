import {
  Transform,
  Type,
} from "class-transformer";

import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
} from "class-validator";

export class SearchQueryDto {
  @Transform(({ value }) =>
    typeof value === "string"
      ? value.trim()
      : value,
  )
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  q!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}