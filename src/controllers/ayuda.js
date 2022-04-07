const { PrismaClient } = require("@prisma/client");
const { hash } = require("argon2");
const { response } = require("express");
const { request } = require("express");
const prisma = new PrismaClient();

exports.getayuda = async (req = request, res = response) => {
  const { userid, conductor } = req.session;
  let usuario;
  if (conductor) {
    usuario = await prisma.conductores.findUnique({
      where: {
        id: userid,
      },
    });
  } else {
    usuario = await prisma.clientes.findUnique({
      where: {
        id: userid,
      },
    });
  }

  res.render("ayuda", {
    usuario,
    titulo: "Ayuda",
  });
};

exports.postayuda = async (req = request, res = response) => {
  req.body.clave = await hash(req.body.clave);

  let usuario = await prisma.clientes.create({
    data: req.body,
  });
  req.session.userid = usuario.id;
  res.app.locals.username = usuario.nombre;

  res.redirect("/registro");
};
