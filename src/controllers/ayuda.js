const { PrismaClient } = require("@prisma/client");
const { hash } = require("argon2");
const { response } = require("express");
const { request } = require("express");
const prisma = new PrismaClient();

exports.getayuda = async (req, res) => {
  res.render("ayuda", {
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

