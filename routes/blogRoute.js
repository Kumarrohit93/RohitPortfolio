const express = require("express")
const router = express.Router()
const {blogPage, description} = require("../controllers/blogController.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/blog", wrapAsync(blogPage))
router.get("/blog/:slug", wrapAsync(description))

module.exports = router