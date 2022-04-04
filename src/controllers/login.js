const { PrismaClient } = require("@prisma/client");
const { verify } = require("argon2");
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { correo, clave } = req.body;

    const buscarUsuario = await prisma.clientes.findUnique({
        where: {
            correo: correo,
        }
    });
    console.log(buscarUsuario);

    if (!buscarUsuario) {
        res.render('login', {error:'Credeciales Incorrectas'});
        return
    }

    let valido = verify(buscarUsuario.clave, clave);

    if (!valido) {
        res.render('login', {error: 'Credenciales Incorrectas'});
        return
    }
    req.session.userid = buscarUsuario.id;
    res.redirect('/mapa');
}