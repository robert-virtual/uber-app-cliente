const { PrismaClient } = require("@prisma/client");
const { verify } = require("argon2");
const { response } = require("express");
const { request } = require("express");
const { cookiename } = require("../constantes");
const prisma = new PrismaClient();

exports.login = async (req = request, res = response) => {
  const { correo, clave } = req.body;
  try {
    const usuario = await prisma.clientes.findUnique({
      where: {
        correo: correo,
      },
    });
    console.log(usuario);

    if (!usuario) {
      res.render("login", {
        tipo: req.body.tipo,
        error: "Credeciales Incorrectas",
      });
      return;
    }

    let valido = verify(usuario.clave, clave);

    if (!valido) {
      res.render("login", {
        tipo: req.body.tipo,
        error: "Credenciales Incorrectas",
      });
      return;
    }
    req.session.userid = usuario.id;
    res.app.locals.username = usuario.nombre;
    res.redirect("/mapa");
  } catch (error) {
    res.render(`login`, {
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
