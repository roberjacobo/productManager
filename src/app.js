const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const apiRoutes = require("./routes/index.routes");

const app = express();
const PORT = 8080;

// Template engine
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/api", apiRoutes);

const httpServer = app.listen(PORT, () => {
  return `Server listening on port ${PORT}!`;
});

const socketServer = new Server(httpServer);

module.exports = socketServer;
