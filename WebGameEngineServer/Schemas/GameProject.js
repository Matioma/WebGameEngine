const mongoose = require("mongoose");

const GameProjectSchema = new mongoose.Schema({
  login: String,
  name: String,
  scene: { type: Object, required: false },
  scripts: { type: Object, required: false },
});

const GameProject = mongoose.model("Project", GameProjectSchema);
module.exports = { GameProject };
