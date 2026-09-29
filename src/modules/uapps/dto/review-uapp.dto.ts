import {
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import {
  UAPP_REVIEW_MAX_REJECTION_REASON_LENGTH,
} from "../uapps.constants";

export class ReviewUAppDto {
  @IsString()
  @MinLength(2)
  @MaxLength(
    UAPP_REVIEW_MAX_REJECTION_REASON_LENGTH,
  )
  reason!: string;
}