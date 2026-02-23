const project = require("../models/projectModel.js");
const review = require("../models/review.js");
const homePage = async (req, res) => {
  const projectData = await project.find({});
  const reviewData = await review.find({});
  res.render("./Portfolio/home", { projectData, reviewData });
};

const createReview = async (req, res) => {
    let { username, jobTitle, image, feedback, rating } = req.body;
    if (!image || image.trim() === "") {
      image = undefined;
    }

    if(!username || !jobTitle || !feedback || !rating) {
      res.json({
        success: false, message: "Credentials required!"
      })
    }
    const data = new review({
      username,
      jobTitle,
      image,
      feedback,
      rating,
    });

    await data.save();
    res.redirect("/home");
};

module.exports = { homePage, createReview };
