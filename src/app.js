'use strict';
const express = require("express");
let path = require('path');
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const viewRoutes = require("./routes/index.routes");
const { readFileSync } = require("fs");

const PORT = 8080;
const app = express();

// Template engine (Handlebars)

app.engine(".handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views/layouts/', path.join(__dirname, 'views'));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/api", viewRoutes);


const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

// Servidor Socket
const socketServer = new Server(httpServer);

// emit => emitir eventos
// on => escuchar eventos


// Products Data
const productsData = JSON.parse(readFileSync('./src/models/products.json'));

socketServer.on("connection", (socket) => {
  socket.emit('productsData', productsData);
});