const mongoose = require("mongoose");

// const ProjectSchema = new mongoose.Schema({
//   login: String,
//   projectName: String,
//   currentScene: {
//     behaviours: [],
//     children: [],
//     name: String,
//   },
// });

const ProjectSchema = new mongoose.Schema({
  login: String,
  projectName: String,
  currentScene: { type: Object, required: false },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = { Project };
