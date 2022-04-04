const { PrismaClient } = require("@prisma/client");
const { hash } = require("argon2");
const prisma = new PrismaClient();

exports.getregistro= async (req, res) => {
    res.render("registro", {
      titulo: "Registro",
    });
  }

exports.postregistro= async (req, res) => {
    req.body.clave = await hash(req.body.clave)
    
    await prisma.clientes.create({
        data:req.body
    })
    res.redirect("/");
  }