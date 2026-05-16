const routers = require("express").Router();

routers.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = routers;
