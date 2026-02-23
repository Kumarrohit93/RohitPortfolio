const express = require("express")
const router = express.Router()
const {adminBlog, createBlog, deleteBlog} = require("../controllers/adminBlogController.js")
const isLoggedIn = require("../middleware/auth.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/blog", isLoggedIn, wrapAsync(adminBlog))
router.post("/create-blog", isLoggedIn, wrapAsync(createBlog))
router.delete("/:id/blog", isLoggedIn, wrapAsync(deleteBlog))
module.exports = router