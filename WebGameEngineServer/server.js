const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");

const mongoose = require("mongoose");
mongoose.Promise = Promise;

const User = require("./Schemas/user");
const ProjectTest = require("./Schemas/demoProject");
const { Project, Scene } = require("./Schemas/Project");

const app = express();
const port = 3000;

const dataBaseName = "Credentials";
const Login = "admin";
const password = "admin";
const mongoUrl = `mongodb+srv://${Login}:${password}@webgameengine.wn0wr.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongose connected ");
  });

app.use(
  session({
    secret: "4ASDjfu99485mcccjser",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(bodyparser.json());

var sess;
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
  sess = req.session;
  sess.login = login;

  res.json({ success: true, error: "" });
});

app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;
  const result = await User.findOne({ login: login, password: password });

  sess = req.session;
  sess.login = login;
  //If user if credentials exist send message Success!!
  if (result) {
    res.json({ success: true, error: "" });
    return;
  }
  //if user credentials have not be found send message wrong credentials
  res.json({ success: false, error: "Wrong Credentials!" });
});

app.get("/api/userData", (req, res) => {
  sess = req.session;

  // console.log(req.session);
  if (sess.login) {
    res.json({ success: true, message: sess.login });
  } else {
    res.json({ success: false });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.login(err);
    }
  });
  res.json({ success: true, message: "logged out" });
});
app.get("/api/loggedIn", (req, res) => {
  sess = req.session;
  if (sess.login) {
    res.json({ loggedIn: true });
  }
});

app.get("/api/Projects", async (req, res) => {
  sess = req.session;

  let queryRes = await Project.find({ login: sess.login });
  res.json(queryRes);
});

app.get("/api/Project/:id", async (req, res) => {
  sess = req.session;
  const { id } = req.body;
  console.log(req.params.id);

  let result = await Project.findById({ _id: req.params.id });

  res.json({ success: true, result });
});

app.post("/api/Projects/add", (req, res) => {
  const { projectName } = req.body;

  //const projectName = "Awesome Project";

  sess = req.session;
  const login = sess.login;

  if (Login) {
    let defaultScene = {
      behaviours: [],
      children: [],
      name: "Default Scene",
    };
    const project = new Project({
      login,
      projectName,
      currentScene: defaultScene,
    });

    project.save();
    res.json({ success: true, message: project });
  } else {
    res.json({ success: false, message: "Cookie is Missing" });
  }
});

app.post("/api/Projects/delete", async (req, res) => {
  const { ProjectName } = req.body;
  sess = req.session;
  const Login = sess.login;

  if (Login) {
    let result = await ProjectTest.deleteOne({ Login, ProjectName });
    console.log(result);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/api/Projects/save", async (req, res) => {
  sess = req.session;
  const login = sess.login;

  const projectName = "test";
  const { id, currentScene } = req.body;

  console.log(id, currentScene);

  if (login) {
    const doc = await Project.findById(id);

    const newScene = currentScene;
    const update = { currentScene: newScene };

    await doc.updateOne(update);

    // Project.updateOne({ id }, { projectName: "AWESOME CHANGED PROJECCT" });
    console.log("updated");
    // const project = new Project({
    //   login,
    //   projectName,
    //   currentScene,
    // });

    //project.save();
    //res.json({ success: true, message: ` save to the data base` });
  } //{
  //res.json({ success: false, message: "Cookie missing" });
  //}
  res.json({ success: true, message: ` save to the data base` });
});

app.listen(port, () => {
  console.log("Web Game Engine Backend running on port ", port);
});
