import express, { json } from "express";
import apiRputes from "./routes/index.routes.js";

const app = express();
app.use(json());
const PORT = 8080;

// ROUTES
app.use("/api", apiRputes);

app.listen(PORT, () => {
  return `Server listening on port ${PORT}!`;
});

export default app;
