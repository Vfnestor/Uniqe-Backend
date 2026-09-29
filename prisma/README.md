Uniqe Prisma

این پوشه مسئول Schema، Migration و Seed دیتابیس Backend پروژه Uniqe است.

ساختار

ساختار اصلی این پوشه شامل موارد زیر است:

- "schema.prisma" — مدل‌ها و تنظیمات Prisma
- "prisma.config.ts" — تنظیمات Prisma
- "seed.ts" — نقطه ورود Seed
- "seed-data/" — داده‌های اولیه
- "seeders/" — منطق اجرای Seed
- "migrations/" — Migrationهای دیتابیس

Schema

فایل اصلی مدل‌های دیتابیس:

"prisma/schema.prisma"

این فایل شامل مدل‌ها، enumها، relationها و تنظیمات دیتابیس PostgreSQL است.

Migration

Migrationها توسط Prisma ایجاد می‌شوند و نباید به‌صورت دستی نوشته شوند.

در محیط توسعه:

npm run prisma:migrate

در محیط Production:

npm run prisma:deploy

Validate

برای بررسی صحت Schema:

npm run prisma:validate

Format

برای فرمت کردن Schema:

npm run prisma:format

Generate

برای تولید Prisma Client:

npm run prisma:generate

Seed

برای اجرای داده‌های اولیه:

npm run prisma:seed

یا:

npx prisma db seed

Seedهای پروژه در مسیرهای زیر قرار دارند:

- "prisma/seed-data/"
- "prisma/seeders/"

افزودن UApp جدید

UAppهای اولیه پروژه از طریق Seed مدیریت می‌شوند.

برای اضافه کردن یک UApp جدید، در حالت عادی نیازی به تغییر کد سرویس UApps نیست.

اطلاعات UApp جدید را در:

"prisma/seed-data/uapps.ts"

اضافه کنید.

سپس Seed را اجرا کنید:

npm run prisma:seed

ترتیب پیشنهادی راه‌اندازی

ابتدا وابستگی‌ها را نصب کنید:

npm install

سپس صحت Prisma Schema را بررسی کنید:

npm run prisma:validate

بعد Prisma Client را تولید کنید:

npm run prisma:generate

سپس در محیط توسعه Migration را اجرا کنید:

npm run prisma:migrate

و در نهایت Seed را اجرا کنید:

npm run prisma:seed

Production

در محیط Production نباید از:

npm run prisma:migrate

استفاده شود.

برای اعمال Migrationهای از قبل ساخته‌شده:

npm run prisma:deploy

Prisma Studio

برای مشاهده و مدیریت داده‌های دیتابیس در محیط توسعه:

npm run prisma:studio

متغیرهای محیطی

قبل از اجرای دستورات Prisma باید مقدار معتبر زیر در ".env" وجود داشته باشد:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

نمونه تنظیمات در فایل زیر قرار دارد:

".env.example"

فایل ".env" نباید وارد Git شود.

فایل ".env.example" فقط برای مستندسازی متغیرهای موردنیاز پروژه است.

نکته مهم

Migrationها، Seedها و Schema بخشی از زیرساخت دیتابیس Backend هستند.

قبل از تغییر Schema بهتر است ابتدا تأثیر تغییر روی مدل‌های مرتبط، سرویس‌های Backend و Seedهای موجود بررسی شود.