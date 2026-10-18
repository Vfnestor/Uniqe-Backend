import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class MarkNotificationReadDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  id?: string;
}