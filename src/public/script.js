// Cliente Socket
const socket = io(); // Conexión al socket server => connection
socket.emit("message", "Hola, me estoy comunicando desde el cliente socket!");

socket.on("socket_individual", (data) => {
  console.log("Individual");
  console.log(data);
});

socket.on("todos", (data) => {
  console.log("todos");
  console.log(data);
});