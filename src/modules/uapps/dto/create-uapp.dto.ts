import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUAppDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2000)
  description!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  category!: string;

  @IsIn([
    "user",
    "uniqe",
    "google-play",
    "app-store",
  ])
  source!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  sourceLabel!: string;

  @IsIn([
    "web",
    "android",
    "ios",
    "windows",
    "macos",
    "linux",
    "multi",
  ])
  platform!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  platformLabel!: string;

  @IsIn([
    "web-app",
    "installable",
    "hybrid",
  ])
  type!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  typeLabel!: string;

  @IsIn([
    "available",
    "development",
    "coming-soon",
    "experimental",
  ])
  status!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  statusLabel!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  icon!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  cover?: string;

  @IsIn([
    "blue",
    "purple",
    "green",
    "orange",
    "black",
    "pink",
    "red",
  ])
  accent!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  href!: string;

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
