# Uniqe Prisma

این پوشه مسئول Schema، Migration و Seed دیتابیس Backend پروژه Uniqe است.

## ساختار

```text
prisma/
├── schema.prisma
├── prisma.config.ts
├── seed.ts
├── seed-data/
│   ├── index.ts
│   ├── uapps.ts
│   ├── uapps.types.ts
│   └── README.md
├── seeders/
│   ├── index.ts
│   ├── uapps.seeder.ts
│   └── uapps.seeder.spec.ts
└── migrations/
