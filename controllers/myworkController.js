const Project = require("../models/projectModel.js");

const myWork = async (req, res) => {
  const projectData = await Project.find({});
  res.render("./Portfolio/mywork", { projectData });
};

const projectDescription = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById({ _id: id });
  if (!project) {
    return res.status(404).send("Project not found");
  }
  res.render("./Portfolio/projectDescription.ejs", { project });
};

module.exports = { myWork, projectDescription };
