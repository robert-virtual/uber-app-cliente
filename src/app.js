const session = require('express-session');
const express = require("express");
const { engine } = require("express-handlebars");
const { cookiename } = require('./constantes');
const app = express();
const port = 3000;
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
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
app.use(session({
  name: cookiename,
  cookie: {
    maxAge: 1000*60*60*24*365,
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
  },
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  resave: false,
}))

// rurtas
app.use("/", require("./routes/inicio"));
app.use("/mapa", require("./routes/mapa"));
app.use("/login", require("./routes/login"));
app.use("/registro", require("./routes/registro"));
// rurtas

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
