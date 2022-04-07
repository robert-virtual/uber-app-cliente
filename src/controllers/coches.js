const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const prisma = new PrismaClient();

exports.getCoches = async (req = request, res = response) => {
  const data = await prisma.conductores.findUnique({
    select: {
      carro: true,
      imagenCarro: true,
    },
    where: {
      id: req.session.userid,
    },
  });
  res.render("coches", data);
};
exports.postCoches = async (req = request, res = response) => {
  if (req.file) {
    console.log("file:", req.file);
    req.body.imagenCarro = req.file.filename;
    // req.body.imagenCarro = req.file.filename;
  }
  prisma.conductores.update({
    data: req.body,
    where: {
      id: req.session.userid,
    },
  });
};
