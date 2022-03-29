const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.inicio = async (req, res) => {
  res.render("inicio", {
    titulo: "Inicio",
  });
};
