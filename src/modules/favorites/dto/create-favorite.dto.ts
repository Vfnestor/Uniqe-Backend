import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

const FAVORITE_CATEGORIES = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
] as const;

export class CreateFavoriteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  targetId!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsIn(FAVORITE_CATEGORIES)
  category!: (typeof FAVORITE_CATEGORIES)[number];

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  href!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}