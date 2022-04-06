const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const prisma = new PrismaClient();
exports.getConductores = async (req = request, res = response) => {
  prisma.conductores.findMany({
    select: {
      imagen: true,
      nombre: true,
      tipoCarro: true,
    },
  });
};
