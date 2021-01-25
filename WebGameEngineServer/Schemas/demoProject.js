const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  Login: String,
  ProjectName: String,
});

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
