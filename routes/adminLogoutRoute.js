const express = require("express")
const router = express.Router()
const logout = require("../controllers/adminLogoutController.js")
const isLoggedIn = require("../middleware/auth.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/logout", isLoggedIn, wrapAsync(logout))

module.exports = router