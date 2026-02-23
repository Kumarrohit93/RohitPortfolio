const AppError = require("../utils/ExpressError.js");
const projects = require("../models/projectModel.js");

const projectPage = async (req, res) => {
  const projectData = await projects.find({});
  res.render("./Admin/project.ejs", { projectData });
};

const createProject = async (req, res) => {
  const { title, description, techStack, images, liveLink, githubLink } =
    req.body;

  if (
    !title ||
    !description ||
    !techStack ||
    !images ||
    !liveLink ||
    !githubLink
  ) {
    throw new AppError({ message: "Credentials missing", statusocde: 401 });
  }

  const data = new projects({
    title,
    description,
    images,
    techStack,
    githubLink,
    liveLink,
  });

  await data.save();
  res.redirect("/admin/home");
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  await projects.findByIdAndDelete(id);
  res.redirect("/admin/projects");
};

module.exports = { projectPage, createProject, deleteProject };
