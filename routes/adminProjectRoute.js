const express = require("express")
const router = express.Router()
const {projectPage, createProject, deleteProject} = require("../controllers/adminProjectController.js")
const isLoggedIn = require("../middleware/auth.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/projects", isLoggedIn, wrapAsync(projectPage))
router.post("/create-projects", isLoggedIn, wrapAsync(createProject))
router.delete("/:id/project", isLoggedIn, wrapAsync(deleteProject))
module.exports = router