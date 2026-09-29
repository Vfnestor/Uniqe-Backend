import { PrismaClient } from "@prisma/client";
import { seedUApps } from "./seeders";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Uniqe database seed...");

  await seedUApps(prisma);

  console.log("✅ Uniqe database seed completed.");
}

main()
  .catch((error) => {
    console.error("❌ Database seed failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });