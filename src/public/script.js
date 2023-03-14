// Cliente Socket
const socket = io(); // Conexión al socket server => connection
socket.emit("message", "Hola, me estoy comunicando desde el cliente socket!");

socket.on("productsData", (data) => {
  console.log("productsData-:", JSON.stringify(data));
});