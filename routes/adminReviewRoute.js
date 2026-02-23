const express = require("express")
const router = express.Router()
const {reviewPage, deleteReview} = require("../controllers/adminReviewController.js")
const isLoggedIn = require("../middleware/auth.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/review", isLoggedIn, wrapAsync(reviewPage))
router.delete("/:id/review", isLoggedIn, wrapAsync(deleteReview))

module.exports = router