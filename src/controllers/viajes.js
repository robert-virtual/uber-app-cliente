const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const prisma = new PrismaClient();

exports.updateViaje = async (req = request, res = response) => {
  req.body.iniciado = req.body.iniciado ? true : false;
  req.body.finalizado = req.body.finalizado ? true : false;
  req.body.cancelado = req.body.cancelado ? true : false;
  await prisma.viajes.update({
    data: req.body,
    where: {
      id: Number(req.params.id),
    },
  });
  res.redirect("/viajes");
};

exports.getViajes = async (req = request, res = response) => {
  if (!req.session.userid) {
    return res.redirect("/");
  }
  let where = {
    clienteId: Number(req.session.userid),
    cancelado: false,
  };
  if (req.session.conductor) {
    where.conductorId = Number(req.session.userid);
    where.clienteId = undefined;
  }
  const viajes = await prisma.viajes.findMany({
    select: {
      id: true,
      iniciado: true,
      finalizado: true,
      cancelado: true,
      clienteId: true,
      conductorId: true,
      destino: true,
      metodoPago: true,
      monto: true,
      conductores: {
        select: {
          direccion: true,
          nombre: true,
          carro: true,
          correo: true,
          imagen: true,
          tipoCarro: true,
          telefono: true,
        },
      },
      clientes: {
        select: {
          nombre: true,
          direccion: true,
          imagen: true,
          telefono: true,
        },
      },
    },
    where,
  });
  console.log("viajes:", viajes);
  res.render("viajes", {
    viajes: viajes.length && viajes.reverse(),
  });
};
exports.postViaje = async (req = request, res = response) => {
  const viaje = await prisma.viajes.create({
    data: {
      clienteId: Number(req.session.userid),
      conductorId: Number(req.body.conductor),
      destino: req.body.destino,
      monto: Number(req.body.monto),
      duracion: String(req.body.minutes),
    },
  });
  res.json(viaje);
};
