const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.inicio = async (req, res) => {
  const users = await prisma.clientes.findMany({
    skip: 0,
    take: 5,
    select: {
      nombre: true,
      correo: true,
      viajes: {
        select: {
          fecha: true,
          destino: true,
        },
      },
    },
  });
  console.log(users);
  res.render("inicio", {
    titulo: "Inicio",
    nombre: "Hola mundo handlebars",
    users,
  });
};
