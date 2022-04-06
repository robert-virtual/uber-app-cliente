const { PrismaClient } = require("@prisma/client");
const { hash } = require("argon2");
const { response } = require("express");
const { request } = require("express");
const prisma = new PrismaClient();

exports.getregistro = async (req = request, res = response) => {
  const { tipo } = req.query;
  if (!tipo) {
    return res.redirect("/");
  }
  res.render("registro", {
    titulo: "Registro",
    tipo,
  });
};

exports.postregistro = async (req = request, res = response) => {
  const { tipo } = req.body;
  try {
    req.body.clave = await hash(req.body.clave);
    let usuario;
    if (tipo == "Conductores") {
      usuario = await prisma.conductores.create({
        data: req.body,
      });
    } else {
      usuario = await prisma.clientes.create({
        data: req.body,
      });
    }
    req.session.userid = usuario.id;
    res.app.locals.username = usuario.nombre;

    res.redirect("/mapa");
  } catch (error) {
    res.render(`registro`, {
      tipo: req.body.tipo,
      error:
        "Lo sentimos ha habido un error al relaizar la peticion vuelva a intentar mas tarde",
    });
  }
};
