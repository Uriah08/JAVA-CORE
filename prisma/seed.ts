import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "../data/machines.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const areaData of jsonData.areas) {
    const area = await prisma.area.create({
      data: {
        name: areaData.name,
        equipmentGroups: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: areaData.equipmentGroups.map((group: any) => ({
            name: group.name,
            equipmentNames: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              create: group.equipmentNames.map((equipment: any) => ({
                name: equipment.name,
                components: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  create: equipment.components.map((component: any) => ({
                    name: component.name,
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    console.log(`✅ Created Area: ${area.name}`);
  }
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
