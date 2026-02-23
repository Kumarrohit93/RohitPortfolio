const express = require("express")
const router = express.Router()
const {adminLoginPage, adminLogin} = require("../controllers/adminLoginController.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/loginPage", wrapAsync(adminLoginPage))
router.post("/login", wrapAsync(adminLogin))

module.exports = router