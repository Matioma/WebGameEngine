const express = require("express");

const app = express();
const port = 3000;

app.post("/api/register", (req, res) => {
  console.log("Register Called");
  res.send("Registration Called");
});
app.post("/api/login", (req, res) => {
  console.log("Login Called");
  res.send("Login Called");
});

app.listen(port, () => {
  console.log("Web Game Engine Backend running on port ", port);
});
