const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const prisma = new PrismaClient();

exports.getConductores = async (req = request, res = response) => {
  try {
    const { ciudadId } = await prisma.clientes.findUnique({
      select: {
        ciudadId: true,
      },
      where: {
        id: req.session.userid,
      },
    });
    const conductores = await prisma.conductores.findMany({
      where: {
        ciudadId,
      },
      take: 10,
      select: {
        id: true,
        imagen: true,
        nombre: true,
        tipoCarro: true,
        correo: true,
        telefono: true,
        carro: true,
      },
    });
    res.json(conductores);
  } catch (error) {
    res.json({ error: error.message });
  }
};
