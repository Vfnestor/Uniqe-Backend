# Uniqe UApp Seed Data

تمام UAppهای اولیه Uniqe از طریق داده‌های این پوشه وارد دیتابیس می‌شوند.

## ساختار

فایل اصلی داده‌ها:

`uapps.ts`

این فایل باید فقط شامل داده‌های UApp باشد.

منطق ایجاد یا به‌روزرسانی UAppها در این فایل نیست:

`../seeders/uapps.seeder.ts`

## اضافه کردن UApp جدید

برای اضافه کردن یک UApp جدید، فقط یک رکورد جدید به `uAppsSeedData` اضافه کنید.

برای مثال:

```ts
{
  productCode: "MY-NEW-APP",

  name: "نام برنامه",
  description: "توضیح برنامه",
  category: "دسته‌بندی",

  source: UAppSource.USER,
  sourceLabel: "User",

  platform: UAppPlatform.WEB,
  platformLabel: "Web",

  type: UAppType.WEB_APP,
  typeLabel: "Web App",

  status: UAppStatus.AVAILABLE,
  statusLabel: "فعال",

  icon: "🧩",
  accent: UAppAccent.BLUE,

  href: "/uapps/my-new-app",

  featured: false,
  verified: false,

  version: "1.0.0",

  official: false,

  releaseLabel: "نسخه پایدار",
  releaseStatus: UAppReleaseStatus.STABLE,

  reviewStatus:
    UAppReviewStatus.APPROVED,
}