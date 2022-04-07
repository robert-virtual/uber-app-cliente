const { PrismaClient } = require("@prisma/client");
const { verify } = require("argon2");
const { response } = require("express");
const { request } = require("express");
const { cookiename } = require("../constantes");
const prisma = new PrismaClient();

exports.login = async (req = request, res = response) => {
  const { tipo } = req.body; // conductor o cliente

  const { correo, clave } = req.body;
  try {
    let usuario;
    if (tipo == "Conductores") {
      usuario = await prisma.conductores.findUnique({
        where: {
          correo: correo,
        },
      });
    } else {
      usuario = await prisma.clientes.findUnique({
        where: {
          correo: correo,
        },
      });
    }

    if (!usuario) {
      res.render("login", {
        tipo: req.body.tipo,
        error: "Credeciales Incorrectas",
      });
      return;
    }

    let valido = await verify(usuario.clave, clave);

    if (!valido) {
      res.render("login", {
        tipo: req.body.tipo,
        error: "Credenciales Incorrectas",
      });
      return;
    }
    req.session.userid = usuario.id;
    req.session.cliente = tipo != "Conductores";
    req.session.conductor = tipo == "Conductores";
    if (tipo == "Conductores") {
      res.redirect("/viajes");
      return;
    }
    res.redirect("/mapa");
  } catch (error) {
    res.render("login", {
      tipo: req.body.tipo,
      error:
        "Lo sentimos ha habido un error al realizar la peticion vuelva a intentar mas tarde",
    });
  }
};

exports.logout = (req = request, res = response) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("mapa", {
        error: "no se pudo cerra la session intente mas tarde",
      });
      return;
    }
    res.clearCookie(cookiename);
    res.redirect("/");
  });
};
