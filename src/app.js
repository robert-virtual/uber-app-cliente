const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
// configuracion handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// directorio donde estaran las vistas
app.set("views", "./views");
// configuracion handlebars

app.use(express.json()); // convertir json en objetos de javacript
app.use(express.urlencoded({ extended: false })); // convertir info de formulario en objetos de javacript

// rurtas
app.use("/", require("./routes/inicio"));
app.use("/login", require("./routes/login"));
// rurtas

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
