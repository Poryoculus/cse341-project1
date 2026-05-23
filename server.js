const express = require("express");
const bodyParser = require("body-parser");

const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", require("./routes"));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(
        `Database is listening and Node Server is running on port ${port}`,
      );
    });
  }
});
