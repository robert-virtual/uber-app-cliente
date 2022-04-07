exports.cookiename = "sesionid";
// __prod__ = valor boleano que indica
// si estamos en un entorno de produccion o no
exports.__prod__ = process.env.NODE_ENV == "production";
