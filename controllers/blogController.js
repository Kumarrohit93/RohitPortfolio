const blog = require("../models/blogModel.js");

const blogPage = async (req, res) => {
  const blogs = await blog.find();
  res.render("./Portfolio/blog.ejs", { blogs });
};

const description = async (req, res) => {
  const { slug } = req.params;
  const blogs = await blog.findOne({ slug });
  const Blog = await blog.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true },
  );
  if (!blogs) {
    res.json({
      message: "blog not found",
    });
  }

  res.render("./Portfolio/blogDescription.ejs", { blogs, Blog });
};

module.exports = { blogPage, description };
