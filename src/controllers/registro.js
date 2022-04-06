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
  res.render("registro", {
    titulo: "Registro",
    tipo,
  });
};

exports.postregistro = async (req = request, res = response) => {
  const { tipo } = req.body;
  delete req.body.tipo;
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
    req.session.tipoUser = tipo;

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
