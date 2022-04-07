const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("argon2");
const { response } = require("express");
const { request } = require("express");

exports.getregistro = async (req = request, res = response) => {
  const { tipo } = req.query;
  if (!tipo) {
    return res.redirect("/");
  }
  const ciudades = await prisma.ciudad.findMany();
  res.render("registro", {
    titulo: "Registro",
    tipo,
    ciudades,
  });
};

exports.postregistro = async (req = request, res = response) => {
  const { tipo } = req.body;
  delete req.body.tipo;
  try {
    req.body.clave = await hash(req.body.clave);
    let usuario;
    req.body.ciudadId = Number(req.body.ciudadId);
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
    req.session.conductor = tipo == "Conductores";
    req.session.cliente = tipo != "Conductores";
    req.session.username = usuario.nombre || usuario.correo;
    req.session.perfil = usuario.imagen;
    if (tipo == "Conductores") {
      res.redirect("/viajes");
      return;
    }
    res.redirect("/mapa");
  } catch (error) {
    let correoError;
    if (error.message.includes("correo")) {
      correoError =
        "El correo proporcionado ya esta vinculado a una cuenta intente iniciar session";
    }
    console.warn(error);
    res.render(`registro`, {
      tipo: req.body.tipo,
      error:
        correoError ||
        "Lo sentimos ha habido un error al realizar la peticion vuelva a intentar mas tarde",
    });
  }
};
