const express = require("express");
const apiRputes = require('./routes/index.routes');

const app = express();
app.use(express.json());
const PORT = 8080;

// ROUTES
app.use('/api', apiRputes);

app.listen(PORT, () => {
  return `Server listening on port ${PORT}!`;
});

module.exports = app;
