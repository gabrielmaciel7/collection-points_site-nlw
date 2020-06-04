const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

server.use(express.static("public"));

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) =>
  res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
);
server.get("/create-point", (req, res) => res.render("create-point.html"));
server.get("/search-results", (req, res) => res.render("search-results.html"));

server.listen(3000);
