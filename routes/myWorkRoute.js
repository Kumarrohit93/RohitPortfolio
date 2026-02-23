const express = require("express")
const router = express.Router()
const {myWork, projectDescription} = require("../controllers/myworkController.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/mywork", wrapAsync(myWork))
router.get("/mywork/:id", wrapAsync(projectDescription))
module.exports = router