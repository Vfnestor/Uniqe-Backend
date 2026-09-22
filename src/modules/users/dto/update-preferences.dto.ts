import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdatePreferencesDto {
  @IsOptional()
  @IsIn([
    "SYSTEM",
    "LIGHT",
    "DARK",
  ])
  theme?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  language?: string;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;
}