const express = require("express")
const router = express.Router()
const {homePage, createReview} = require("../controllers/homeController.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/home", wrapAsync(homePage))
router.post("/client-review", wrapAsync(createReview))

module.exports = router