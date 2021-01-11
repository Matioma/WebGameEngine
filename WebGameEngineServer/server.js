const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyparser.json());

app.post("/api/register", (req, res) => {
  console.log("Register Called");
  res.json({ success: "true" });
});
app.post("/api/login", (req, res) => {
  const { login, password } = req.body;
  console.log(login, password);

  console.log("Login Called");
  res.json({ success: "true" });
});

app.listen(port, () => {
  console.log("Web Game Engine Backend running on port ", port);
});
