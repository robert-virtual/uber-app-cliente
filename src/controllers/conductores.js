const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const prisma = new PrismaClient();

exports.getConductores = async (req = request, res = response) => {
  const conductores = await prisma.conductores.findMany({
    select: {
      id: true,
      imagen: true,
      nombre: true,
      tipoCarro: true,
      correo: true,
      telefono: true,
    },
  });
  res.json(conductores);
};
