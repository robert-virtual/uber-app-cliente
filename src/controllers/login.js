const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { correo, clave } = req.body;

    const buscarUsuario = await prisma.usuarios.findUnique({
        where: {
            correo: correo,
            clave: clave,
        }
    });
    console.log(buscarUsuario);

    if (!buscarUsuario) {
        res.render('login');
        return
    }
    let valida = verify
    if (!buscarUsuario.verificarContrasena(clave, buscarUsuario.clave)) {
        res.send('El usuario no existe o contrseña inválida');
    }
    else {
        const user = {
            nombre: buscarUsuario.nombre,
            id: buscarUsuario.id,
            estado: buscarUsuario.estado,
            correo: buscarUsuario.correo
        }
        const token = passport.getToken({ id: buscarUsuario.id });
        console.log(buscarUsuario);
        const data = {
            token: token,
            usuario: user
        };
        res.send('Bienvenido' + user.nombre)
    }
}