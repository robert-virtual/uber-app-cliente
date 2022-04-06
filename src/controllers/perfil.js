const { response, request } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.postPerfil = async (req = request, res = response) => {
  let { tipoUser } = req.session;
  console.log(req.body);
  try {
    if (req.file) {
      req.body.imagen = req.file.filename;
    }
    let usuario;
    if (tipoUser == "Conductores") {
      usuario = await prisma.conductores.update({
        data: req.body,

        where: {
          id: req.session.userid,
        },
      });
    } else {
      usuario = await prisma.clientes.update({
        data: req.body,
        where: {
          id: req.session.userid,
        },
      });
    }
    console.log(usuario);
    res.render("perfil", {
      usuario,
    });
  } catch (error) {
    res.render("perfil", {
      error: "Lo sentimo ha ocuurido un error intente mas tarde",
    });
  }
};
exports.getPerfil = async (req = request, res = response) => {
  if (!req.session.userid) {
    return res.redirect("/");
  }
  let { tipoUser } = req.session;
  let usuario;
  if (tipoUser == "Conductores") {
    usuario = await prisma.conductores.findUnique({
      where: {
        id: req.session.userid,
      },
    });
  } else {
    usuario = await prisma.clientes.findUnique({
      where: {
        id: req.session.userid,
      },
    });
  }
  res.render("perfil", {
    usuario,
    tipos: tipoUser,
  });
};
