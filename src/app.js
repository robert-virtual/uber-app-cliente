const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const { cookiename, __prod__ } = require("./constantes");
if (!__prod__) {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
const session = require("express-session");
const { engine } = require("express-handlebars");
const port = process.env.PORT || 3000;

let RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
let redisClient = new Redis(process.env.REDIS_URL);

app.set("trust proxy", 1); // para estableber el cookie en secure
// configuracion handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// directorio donde estaran las vistas
app.set("views", "./views");
// configuracion handlebars
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json()); // convertir json en objetos de javacript
app.use(express.urlencoded({ extended: false })); // convertir info de formulario en objetos de javacript

//configuracion sesion
app.use(
  session({
    name: cookiename,
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: __prod__,
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    resave: false,
  })
);

// rutas
app.use(async (req, _, next) => {
  if (req.session.userid) {
    let { conductor, cliente, username, perfil } = req.session;

    app.locals.username = username;
    app.locals.cliente = cliente;
    app.locals.conductor = conductor;
    app.locals.perfil = perfil || "/img/person.svg";

    return next();
  }
  app.locals.username = undefined;
  next();
});
app.use("/", require("./routes/inicio"));
app.use("/", require("./routes/auth"));
app.use("/mapa", require("./routes/mapa"));
app.use("/registro", require("./routes/registro"));

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
