const session = require("express-session");
const express = require("express");
const { engine } = require("express-handlebars");
const { cookiename } = require("./constantes");
const app = express();
const port = process.env.PORT || 3000;

let RedisStore = require("connect-redis")(session);
// redis@v4
const { createClient } = require("redis");
let redisClient = createClient({
  legacyMode: true,
  url: process.env.REDIS_URL,
});
redisClient
  .connect()
  .then(() => {
    console.log("redisClient creado con exito");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// configuracion handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// directorio donde estaran las vistas
app.set("views", "./views");
// configuracion handlebars
app.use(express.static("public"));
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
      secure: process.env.NODE_ENV == "production",
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    resave: false,
  })
);

// rutas
app.use("/", require("./routes/inicio"));
app.use("/mapa", require("./routes/mapa"));
app.use("/login", require("./routes/login"));
app.use("/registro", require("./routes/registro"));
// rutas

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
