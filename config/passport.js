const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require('passport');
const estrategiaJWT = require("passport-jwt").Strategy;
const extraerJWT = require("passport-jwt").ExtractJwt;
const jWT = require("jsonwebtoken");
const moment = require('moment');
const duracion = moment.duration(400, "m").asSeconds();
const clave = 'MiClaveSegura';

exports.getToken = (data) => {
    console.log(data);
    return jWT.sign(data, clave, { expiresIn: duracion });
};

const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async (payload, done) => {
    console.log(payload);
    return await prisma.usuarios.findUnique({
        
        where: {
            id: payload.id, estado: 'activo',
        }
    })
        .then((data) => {
            console.log(data);
            return done(null, data.id);
        })
        .catch((error) => {
            return done(null, false);
        });
}));
exports.validarAutenticado = passport.authenticate('jwt', { session: false, failureRedirect: '/api/autenticacion/error/', });