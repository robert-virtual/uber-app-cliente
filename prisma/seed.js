const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.ciudad.createMany({
    skipDuplicates: true,
    data: [
      {
        nombre: "Danli",
      },
      {
        nombre: "Tegucigalpa",
      },
      {
        nombre: "San Pedro Sula",
      },
      {
        nombre: "La Ceiba",
      },
      {
        nombre: "Choluteca",
      },
      {
        nombre: "Tocoa",
      },
      {
        nombre: "Tela",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
