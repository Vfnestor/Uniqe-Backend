import {
  LoginDto,
} from "./login.dto";

/**
 * DTO اختصاصی ورود مدیر.
 *
 * ایمیل و رمز عبور همچنان باید معتبر باشند.
 * تعیین نقش مدیر فقط در بک‌اند انجام می‌شود.
 */
export class AdminLoginDto extends LoginDto {}