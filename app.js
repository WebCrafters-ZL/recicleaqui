const express = require("express");
const app = express();
const port = 8081;
const hbs = require("express-handlebars").engine;

app.use(express.static("public"));

app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

app.get("/", function (req, res) {
  res.render("home", { title: "Demo do Bootstrap" });
});
