const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const { s3, bucket } = require("../config/s3Upload");
const prisma = new PrismaClient();

exports.getCoches = async (req = request, res = response) => {
  const data = await prisma.conductores.findUnique({
    select: {
      carro: true,
      imagenCarro: true,
    },
    where: {
      id: req.session.userid,
    },
  });
  res.render("coches", data);
};
exports.postCoches = async (req = request, res = response) => {
  if (req.file) {
    req.body.imagenCarro = req.file.location;
    // req.body.imagenCarro = req.file.filename;
    if (req.session.imagenCarro) {
      s3.deleteObject(
        { Bucket: bucket, Key: req.session.imagenCarro },
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
        }
      );
    }
  }
  const data = await prisma.conductores.update({
    data: req.body,
    where: {
      id: req.session.userid,
    },
  });
  res.render("coches", data);
};
