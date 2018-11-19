const express = require("express");
const methodOverride = require("method-override");
const db = require("./db");
const { resolve } = require("path");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//Set up middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("dist"));

require("./routes")(app, db);
app.get("*", (req, res) =>
  res.sendFile(resolve(__dirname, "..", "..", "public", "index.html"))
);

/**
 * ===================================
 * Listen to requests on port 8080
 * ===================================
 */

const PORT = process.env.PORT || 8080;

const server = http.listen(PORT, () => console.log("Listening on port 8080!"));

//Run clean up actions when server shuts down
server.on("close", () => {
  console.log("closing server");

  db.pool.end(() => {
    console.log("Shut down database connection");
  });
});
