const blog = require("../models/blogModel.js");
const AppError = require("../utils/ExpressError.js");

const adminBlog = async (req, res) => {
  const blogs = await blog.find({});
  res.render("./Admin/blog", { blogs });
};

const createBlog = async (req, res) => {
    let { title, slug, category, readTime, tags, coverImage, content } =
      req.body;

      if(!title || !slug || !category || !readtime || !tags || !coverImage || !content) {
        throw new AppError({message: "Credentials missing"})
      }

    if (!coverImage || coverImage.trim() === "") {
      coverImage = undefined;
    }

    const data = new blog({
      title,
      slug,
      category,
      readTime,
      tags,
      coverImage,
      content,
    });

    await data.save();
    res.redirect("/admin/blog");
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  await blog.findByIdAndDelete(id);
  res.redirect("/admin/blog");
};
module.exports = { adminBlog, createBlog, deleteBlog };
