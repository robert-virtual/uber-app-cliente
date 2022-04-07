const { response, request } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.postPerfil = async (req = request, res = response) => {
  let { tipoUser } = req.session;
  console.log("postPerfil: body:", req.body);
  try {
    if (req.file) {
      console.log("file:", req.file);
      req.body.imagen = req.file.filename;
      // req.body.imagenCarro = req.file.filename;
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
    console.log("postPerfil: usuario:");
    console.log(usuario);
    res.render("perfil", {
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.render("perfil", {
      error: "Lo sentimo ha ocurrido un error intente mas tarde",
    });
  }
};
exports.getPerfil = async (req = request, res = response) => {
  if (!req.session.userid) {
    return res.redirect("/");
  }
  let usuario;
  if (req.session.conductor) {
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
    conductor: req.session.conductor,
  });
};
