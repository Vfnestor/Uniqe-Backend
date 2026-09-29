import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateUAppDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  sourceLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  platformLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  typeLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  statusLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  cover?: string;

  @IsOptional()
  @IsIn([
    "blue",
    "purple",
    "green",
    "orange",
    "black",
    "pink",
    "red",
  ])
  accent?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  href?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  version?: string;

  @IsOptional()
  @IsBoolean()
  official?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  releaseLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  productCode?: string;

  @IsOptional()
  @IsIn([
    "stable",
    "beta",
    "development",
    "coming-soon",
  ])
  releaseStatus?: string;

  @IsOptional()
  metadata?: unknown;
}