const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const viewRoutes = require("./routes/index.routes");

const PORT = 8080;
const app = express();

// Template engine
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use(viewRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

// Servidor Socket
const socketServer = new Server(httpServer);

// emit => emitir eventos
// on => escuchar eventos

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  console.log("Bienvenido ", socket.id);

  socket.on("message", (data) => {
    console.log("Llegó evento message desde el cliente");
    console.log(data);
  });

  // Bienvenido Roberto
  socket.emit("socket_individual", "Este mensaje sólo lo recibe un socket");

  // Roberto se ha conectado
  socket.broadcast.emit(
    "todos_menos_el_actual",
    "Este mensaje lo reciben todos los clientes menos el actual"
  );

  // Roberto => mensaje | Roberto, cliente1, cliente2...
  socketServer.emit("todos", "Este mensaje lo reciben todos.");
});
