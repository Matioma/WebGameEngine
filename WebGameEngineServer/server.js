const express = require("express");
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
mongoose.Promise = Promise;

const User = require("./Schemas/user");

const app = express();
const port = 3000;

const dataBaseName = "Credentials";
const login = "admin";
const password = "admin";
const mongoUrl = `mongodb+srv://${login}:${password}@webgameengine.wn0wr.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl).then(() => {
  console.log("mongose connected ");
});

app.use(bodyparser.json());
app.post("/api/register", async (req, res) => {
  const { login, password } = req.body;

  const result = await User.findOne({ login: login });
  //If the user login already exists
  if (result) {
    res.json({ success: false, error: "This login is already in use!" });
    return;
  }
  //If such login does not exist
  const newUser = new User({ login, password });
  newUser.save();
  console.log("User", login, "registered");
  res.json({ success: true, error: "" });
});

app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;

  const result = await User.findOne({ login: login, password: password });
  if (result) {
    res.json({ success: true, error: "" });
    return;
  }

  res.json({ success: false, error: "Wrong Credentials!" });
});

app.listen(port, () => {
  console.log("Web Game Engine Backend running on port ", port);
});
